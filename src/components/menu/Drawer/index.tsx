import { ClassNames } from "@emotion/react";
import { SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

import { useGoBack } from "../../../utils/location";
import { ios } from "../../../utils/platforms";
import useEditMode from "../../../utils/useEditMode";
import MenuList from "../List";
import MenuTypeProvider, { MenuType } from "../MenuTypeProvider";
import useMenuOpen from "../useMenuOpen";

const MenuDrawer = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { editMode } = useEditMode();
  const goBack = useGoBack();
  const searchParams = new URLSearchParams(location.search);
  const match = useMatch("/");
  const wide = useMediaQuery(theme.breakpoints.up("md"));
  const disableSwipeToOpen =
    ios ||
    wide ||
    !match ||
    (editMode && Array.from(searchParams.keys()).length > 1);
  const open = useMenuOpen();

  const onClose = () => open && goBack();

  const onOpen = () => {
    searchParams.set("menu", "");

    navigate({
      search: `?${searchParams.toString()}`,
    });
  };

  return (
    <MenuTypeProvider type={MenuType.Drawer}>
      <ClassNames>
        {({ css }) => (
          <SwipeableDrawer
            className={css`
              z-index: ${theme.zIndex.modal};
            `}
            data-screenshot="drawer-menu"
            disableSwipeToOpen={disableSwipeToOpen}
            onClose={onClose}
            onOpen={onOpen}
            open={open}
            PaperProps={{
              className: css`
                max-width: 320px;
                width: calc(100vw - 56px);

                @supports (padding: env(safe-area-inset-left)) {
                  max-width: calc(320px + env(safe-area-inset-left));
                  padding-top: env(safe-area-inset-top);
                }
              `,
            }}
          >
            <MenuList />
          </SwipeableDrawer>
        )}
      </ClassNames>
    </MenuTypeProvider>
  );
};

export default MenuDrawer;
