using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Navigation;
using Microsoft.Web.WebView2.Core;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Microsoft.UI.Windowing; // Added for AppWindow

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace Munchkin
{
  /// <summary>
  /// An empty window that can be used on its own or navigated to within a Frame.
  /// </summary>
  public sealed partial class MainWindow : Window
  {
    public MainWindow()
    {
      InitializeComponent();

      // Set proper app title for WinUI 3
      this.AppWindow.Title = "Munchkin";

      // this.AppWindow.SetIcon("Assets/Icon.ico");

      // var isDarkTheme = Application.Current.RequestedTheme == ApplicationTheme.Dark;
      // this.AppWindow.TitleBar.BackgroundColor = isDarkTheme ? Colors.Black : Colors.White;

      // var resourceLoader = new Microsoft.Windows.ApplicationModel.Resources.ResourceLoader();
      // this.Title = resourceLoader.GetString("Title");

      //this.ExtendsContentIntoTitleBar = true;

      this.InitializeWebView();
    }

    private async void InitializeWebView()
    {
      await webView2.EnsureCoreWebView2Async(null);

      //Trace.WriteLine("Test me " + Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Assets", "www"));

      webView2.CoreWebView2.SetVirtualHostNameToFolderMapping(
          "www",
          Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Assets", "www"),
          CoreWebView2HostResourceAccessKind.Allow
      );

      // Delegate web messaging logic to bridge (universal)
      var bridge = new WebViewBridge(webView2, this);
      bridge.Initialize();

      webView2.CoreWebView2.Navigate("https://www/index.html");
    }
  }
}
