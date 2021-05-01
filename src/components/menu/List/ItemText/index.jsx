import { css } from "@emotion/react";
import { ListItemText } from "@material-ui/core";

const MenuListItemText = (props) => (
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
