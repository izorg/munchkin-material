# Munchkin Cordova

Java environment setup

```shell
export CORDOVA_JAVA_HOME=$(/usr/libexec/java_home -v17)
```

Consume purchase

```js
CdvPurchase.store.adapters.list[0].bridge.consumePurchase(
  console.log,
  console.log,
  "purchase-token-from-play-console",
);
```

List iOS emulators

```shell
cordova emulate ios --list
```

[Sentry fix](https://github.com/getsentry/sentry-cordova/issues/102#issuecomment-440871845)

```shell
rm /usr/local/bin/node && ln -s $(eval which node) /usr/local/bin/node
```

To fix Sentry architecture add two scripts according to [docs](https://docs.sentry.io/platforms/javascript/cordova/#run-script-phase)
