# Munchkin Cordova

## Development

Check platforms requirements:

- [Android](https://cordova.apache.org/docs/en/12.x/guide/platforms/android/index.html)
- [iOS](https://cordova.apache.org/docs/en/12.x/guide/platforms/ios/index.html)

Install package dependencies

```shell
yarn install
```

Build `www` folder for Cordova project

```shell
yarn build:www
```

Add `google-services.json` & `GoogleService-Info.plist` to package folder. To get those files follow https://support.google.com/firebase/answer/7015592.

Create platform projects

```shell
yarn cordova:prepare
```

> [!Note]
> Cordova could change `yarn.lock` during this command run, please
> revert this file if it is changed.

Now you can build or run project following related commands `build:<platform>` or `run:<platform>` (example, `yarn build:android`). Check Cordova CLI commands https://cordova.apache.org/docs/en/12.x/reference/cordova-cli/index.html.

---

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
