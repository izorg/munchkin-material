import { ListItemButton, styled } from "@mui/material";

export const SettingsListItemButton = styled(ListItemButton)(() => ({
  "@supports (padding: max(0px)) and (padding: env(safe-area-inset-left))": {
    paddingLeft: "max(16px, env(safe-area-inset-left))",
    paddingRight: "max(16px, env(safe-area-inset-left))",
  },
})) as typeof ListItemButton;
