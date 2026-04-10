import { Insets } from "./Insets";
import { useExitApp } from "./useExitApp";
import { useHeaderColor } from "./useHeaderColor";
import { useHideSplashScreen } from "./useHideSplashScreen";
import { useKeyboardStyle } from "./useKeyboardStyle";
import { useNavigationBreadcrumbs } from "./useNavigationBreadcrumbs";
import { useStatusBar } from "./useStatusBar";

export const CordovaApp = () => {
  useExitApp();
  useHeaderColor();
  useHideSplashScreen();
  useKeyboardStyle();
  useNavigationBreadcrumbs();
  useStatusBar();

  return <Insets />;
};
