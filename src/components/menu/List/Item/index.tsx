import { css } from "@emotion/react";
import { ListItem, ListItemProps, useTheme } from "@mui/material";
import type { ElementType } from "react";

import usePresentSelector from "../../../../utils/usePresentSelector";
import { useMenuType } from "../../MenuTypeProvider";

const MenuListItem = <D extends ElementType>(
  props: ListItemProps<D>
): JSX.Element => {
  const theme = useTheme();

  const collapsed = usePresentSelector((state) => state.ui.menuCollapsed);
  const menuType = useMenuType();

  let styles;

  if (menuType === "drawer") {
    styles = css`
      @supports (padding: max(env(safe-area-inset-left))) {
        padding-left: max(16px, env(safe-area-inset-left));
      }
    `;
  }

  if (menuType === "sidebar") {
    const transition = theme.transitions.create(["border-radius", "padding"], {
      duration: theme.transitions.duration.short,
    });

    if (collapsed) {
      styles = css`
        border-radius: ${theme.shape.borderRadius}px;
        padding-left: ${theme.spacing(2)};
        padding-right: ${theme.spacing(2)};
        transition: ${transition};
      `;
    } else {
      styles = css`
        padding-left: ${theme.spacing(2)};
        padding-right: ${theme.spacing(2)};
        transition: ${transition};

        ${theme.breakpoints.up("sm")} {
          padding-left: ${theme.spacing(3)};
          padding-right: ${theme.spacing(3)};
        }
      `;
    }
  }

  return <ListItem css={styles} {...props} />;
};

export default MenuListItem;
