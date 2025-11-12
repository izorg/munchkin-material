import { ListItemText, type ListItemTextProps } from "@mui/material";

const MenuListItemText = ({ sx = [], ...props }: ListItemTextProps) => (
  <ListItemText
    slotProps={{
      primary: { noWrap: true },
      secondary: { noWrap: true },
    }}
    {...props}
    sx={[
      {
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      ...[sx].flat(),
    ]}
  />
);

export default MenuListItemText;
