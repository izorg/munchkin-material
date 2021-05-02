import { css } from "@emotion/react";
import { ListItemText, ListItemTextProps } from "@material-ui/core";

const MenuListItemText = (props: ListItemTextProps): JSX.Element => (
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
