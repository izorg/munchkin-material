using System;
using System.Diagnostics;
using System.Text.Json;
using System.Threading.Tasks;
using Windows.Services.Store;
using Microsoft.UI.Xaml;
using WinRT.Interop;

namespace Munchkin
{
  /// <summary>
  /// Handles integration between WebView2 and native app.
  /// </summary>
  public sealed class WebViewBridge
  {
    private const string FullVersionStoreId = "9PB5JF20KQ4B";
    private readonly Microsoft.UI.Xaml.Controls.WebView2 _webView;
    private readonly IntPtr _hwnd;

    public WebViewBridge(Microsoft.UI.Xaml.Controls.WebView2 webView, Window window)
    {
      _webView = webView ?? throw new ArgumentNullException(nameof(webView));
      if (window == null) throw new ArgumentNullException(nameof(window));
      _hwnd = WindowNative.GetWindowHandle(window);
    }

    public void Initialize()
    {
      var core = _webView.CoreWebView2;
      if (core == null)
        return;

      core.Settings.IsWebMessageEnabled = true;

      core.WebMessageReceived += async (_, e) =>
      {
        try
        {
          var text = e.TryGetWebMessageAsString();
          if (string.Equals(text, "getIapStatus", StringComparison.OrdinalIgnoreCase))
          {
            await SendIapStatusToWebAsync();
            return;
          }
          if (string.Equals(text, "purchaseFullVersion", StringComparison.OrdinalIgnoreCase))
          {
            await HandlePurchaseRequestAsync();
            return;
          }

          using var doc = JsonDocument.Parse(text);
          if (doc.RootElement.ValueKind == JsonValueKind.Object &&
              doc.RootElement.TryGetProperty("type", out var typeProp))
          {
            var type = typeProp.GetString();
            if (string.Equals(type, "getIapStatus", StringComparison.OrdinalIgnoreCase))
            {
              await SendIapStatusToWebAsync();
              return;
            }
            if (string.Equals(type, "purchaseFullVersion", StringComparison.OrdinalIgnoreCase))
            {
              await HandlePurchaseRequestAsync();
              return;
            }
          }
        }
        catch (Exception ex)
        {
          Debug.WriteLine($"WebMessageReceived parsing failed: {ex}");
        }
      };
    }

    private async Task HandlePurchaseRequestAsync()
    {
      try
      {
        var context = StoreContext.GetDefault();
        InitializeWithWindow.Initialize(context, _hwnd);
        StorePurchaseResult result = await context.RequestPurchaseAsync(FullVersionStoreId);
        await SendIapPurchaseResultToWebAsync(result);
        // After purchase attempt, also refresh status
        await SendIapStatusToWebAsync();
      }
      catch (Exception ex)
      {
        Debug.WriteLine($"Failed to handle purchase request: {ex}");
        var payload = JsonSerializer.Serialize(new
        {
          type = "iapPurchaseResult",
          storeId = FullVersionStoreId,
          status = "Error",
          error = ex.Message
        });
        _webView?.CoreWebView2?.PostWebMessageAsJson(payload);
      }
    }

    private async Task SendIapPurchaseResultToWebAsync(StorePurchaseResult result)
    {
      try
      {
        string status = result.Status.ToString();
        string? extendedError = result.ExtendedError?.Message;
        var payload = JsonSerializer.Serialize(new
        {
          type = "iapPurchaseResult",
          storeId = FullVersionStoreId,
          status,
          error = extendedError
        });
        _webView?.CoreWebView2?.PostWebMessageAsJson(payload);
      }
      catch (Exception ex)
      {
        Debug.WriteLine($"Failed to send IAP purchase result: {ex}");
      }
      await Task.CompletedTask;
    }

    private async Task SendIapStatusToWebAsync()
    {
      try
      {
        var purchased = await IsFullVersionPurchasedAsync();
        var payload = JsonSerializer.Serialize(new
        {
          type = "iapStatus",
          storeId = FullVersionStoreId,
          purchased
        });
        _webView?.CoreWebView2?.PostWebMessageAsJson(payload);
      }
      catch (Exception ex)
      {
        Debug.WriteLine($"Failed to send IAP status to web: {ex}");
      }
    }

    private static async Task<bool> IsFullVersionPurchasedAsync()
    {
      try
      {
        var context = StoreContext.GetDefault();
        var appLicense = await context.GetAppLicenseAsync();
        if (appLicense == null)
          return false;

        if (appLicense.AddOnLicenses != null &&
            appLicense.AddOnLicenses.TryGetValue(FullVersionStoreId, out var addOnLicense))
        {
          return addOnLicense.IsActive;
        }

        return false;
      }
      catch (Exception ex)
      {
        Debug.WriteLine($"IAP license check failed: {ex}");
        return false;
      }
    }
  }
}
