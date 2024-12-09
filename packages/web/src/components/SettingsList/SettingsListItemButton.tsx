import { ListItemButton, styled } from "@mui/material";

export const SettingsListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: `calc(${theme.spacing(2)} + var(--inset-left)) /*! @noflip */`,
  paddingRight: `calc(${theme.spacing(2)} + var(--inset-left)) /*! @noflip */`,
})) as typeof ListItemButton;
