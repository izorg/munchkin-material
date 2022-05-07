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
      ...(Array.isArray(sx) ? sx : [sx]), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    ]}
  />
);

export default MenuListItemText;
