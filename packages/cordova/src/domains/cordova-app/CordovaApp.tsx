import { Insets } from "./Insets";
import { Keyboard } from "./Keyboard";
import { useAnalyticsScreenView } from "./useAnalyticsScreenView";
import { useExitApp } from "./useExitApp";
import { useHeaderColor } from "./useHeaderColor";
import { useHideSplashScreen } from "./useHideSplashScreen";
import { useKeyboardStyle } from "./useKeyboardStyle";
import { useNavigationBreadcrumbs } from "./useNavigationBreadcrumbs";
import { useStatusBar } from "./useStatusBar";

export const CordovaApp = () => {
  useExitApp();
  useNavigationBreadcrumbs();
  useHideSplashScreen();
  useStatusBar();
  useHeaderColor();
  useKeyboardStyle();
  useAnalyticsScreenView();

  if (cordova.platformId === "android") {
    return (
      <>
        <Insets />
        <Keyboard />
      </>
    );
  }

  return null;
};
