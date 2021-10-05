# Munchkin Cordova

Consume purchase

```javascript
store.inappbilling.consumePurchase(console.log, console.log, 'full_version');
```

List iOS emulators

```shell script
cordova emulate ios --list
```

[Sentry fix](https://github.com/getsentry/sentry-cordova/issues/102#issuecomment-440871845)

```shell script
rm /usr/local/bin/node && ln -s $(eval which node) /usr/local/bin/node
```

To fix Sentry architecture add two scripts according to [docs](https://docs.sentry.io/platforms/javascript/cordova/#run-script-phase)

## Windows locale resources fix

Copy to `cordova\platforms\windows\CordovaApp.projitems` before `<PRIResource Include="strings/buildinfo.resjson" />`

```xml
<PRIResource Include="$(MSBuildThisFileDirectory)strings\cs\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\da\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\de\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\el\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\en\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\es\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\fi\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\fr\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\he\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\hu\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\hy\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\it\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\nb\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\nl\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\pl\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\pt-BR\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\pt\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\ru\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\sk\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\tr\resources.resjson" />
<PRIResource Include="$(MSBuildThisFileDirectory)strings\uk\resources.resjson" />
```

Copy content of `cordova\res\windows\strings` to `cordova\platforms\windows\strings`
