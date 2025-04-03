import { useThemeColor } from "../theme";

export const WebApp = () => (
  <meta content={useThemeColor()} name="theme-color" />
);
