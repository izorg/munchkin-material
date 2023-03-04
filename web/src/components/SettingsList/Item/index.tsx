import { ListItem, type ListItemProps } from "@mui/material";
import { type ElementType } from "react";

const MenuListItem = <D extends ElementType>({
  sx = [],
  ...props
}: ListItemProps<D>) => (
  <ListItem
    {...props}
    sx={[
      {
        "@supports (padding: max(env(safe-area-inset-left)))": {
          paddingLeft: "max(16px, env(safe-area-inset-left))",
          paddingRight: "max(16px, env(safe-area-inset-left))",
        },
      },
      ...(sx instanceof Array ? sx : [sx]),
    ]}
  />
);

export default MenuListItem;
