import { css } from "@emotion/react";
import { ListItemText, type ListItemTextProps } from "@mui/material";

const MenuListItemText = (props: ListItemTextProps) => (
  <ListItemText
    css={css`
      overflow: hidden;
      text-overflow: ellipsis;
    `}
    primaryTypographyProps={{ noWrap: true }}
    secondaryTypographyProps={{ noWrap: true }}
    {...props}
  />
);

export default MenuListItemText;
