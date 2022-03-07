import { ListItemText, type ListItemTextProps } from "@mui/material";

const MenuListItemText = ({ sx = [], ...props }: ListItemTextProps) => (
  <ListItemText
    primaryTypographyProps={{ noWrap: true }}
    secondaryTypographyProps={{ noWrap: true }}
    {...props}
    sx={[
      {
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  />
);

export default MenuListItemText;
