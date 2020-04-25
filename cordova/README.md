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
