import {
  ListItem,
  type ListItemProps,
  type SxProps,
  type Theme,
  useTheme,
} from "@mui/material";
import { type ElementType } from "react";

import usePresentSelector from "../../../../utils/usePresentSelector";
import { useMenuType } from "../../MenuTypeProvider";

const MenuListItem = <D extends ElementType>({
  sx = [],
  ...props
}: ListItemProps<D>) => {
  const theme = useTheme();

  const collapsed = usePresentSelector((state) => state.ui.menuCollapsed);
  const menuType = useMenuType();

  let styles: SxProps<Theme> = {};

  if (menuType === "drawer") {
    styles = {
      "@supports (padding: max(env(safe-area-inset-left)))": {
        paddingLeft: "max(16px, env(safe-area-inset-left))",
      },
    };
  }

  if (menuType === "sidebar") {
    const transition = theme.transitions.create(["border-radius", "padding"], {
      duration: theme.transitions.duration.short,
    });

    if (collapsed) {
      styles = {
        borderRadius: `${theme.shape.borderRadius}px`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        transition,
      };
    } else {
      styles = {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        transition,

        [theme.breakpoints.up("sm")]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
      };
    }
  }

  return (
    <ListItem {...props} sx={[styles, ...(Array.isArray(sx) ? sx : [sx])]} />
  );
};

export default MenuListItem;
