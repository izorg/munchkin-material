import { ListItemButton, styled } from "@mui/material";

export const SettingsListItemButton = styled(ListItemButton)(({ theme }) => ({
  "@supports (padding: max(0px)) and (padding: env(safe-area-inset-left))": {
    paddingLeft: `max(${theme.spacing(2)}, env(safe-area-inset-left))`,
    paddingRight: `max(${theme.spacing(2)}, env(safe-area-inset-left))`,
  },
})) as typeof ListItemButton;
