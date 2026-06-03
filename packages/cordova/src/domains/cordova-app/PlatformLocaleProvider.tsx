import { captureException } from "@sentry/react";
import { type FC, type PropsWithChildren } from "react";

import { type LocaleContextValue, LocaleProvider } from "@munchkin/web";

import { getAndroidApiLevel } from "./android";

export const PlatformLocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  let value: LocaleContextValue | undefined = undefined;

  if (
    globalThis.cordova.platformId === "android" &&
    getAndroidApiLevel() >= 33
  ) {
    value = {
      openLocaleSettings: () => {
        globalThis.plugins?.intentShim?.startActivity(
          {
            action: "android.settings.APP_LOCALE_SETTINGS",
            url: `package:${globalThis.BuildInfo.packageName}`,
          },
          () => {
            // noop
          },
          () => {
            captureException(new Error("Failed to open app language settings"));
          },
        );
      },
    };
  }

  return <LocaleProvider value={value}>{children}</LocaleProvider>;
};
