import { ListItemText, type ListItemTextProps } from "@mui/material";

const MenuListItemText = (props: ListItemTextProps) => (
  <ListItemText
    primaryTypographyProps={{ noWrap: true }}
    secondaryTypographyProps={{ noWrap: true }}
    sx={{
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    {...props}
  />
);

export default MenuListItemText;
