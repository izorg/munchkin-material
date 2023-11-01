import { useTheme } from "@mui/material";

import useStatusBar from "./useStatusBar";

const StatusBarProvider = () => {
  useStatusBar(useTheme());

  return null;
};

export default StatusBarProvider;
