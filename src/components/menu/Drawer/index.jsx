import {
  makeStyles,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

import { EDIT } from "../../../routes/Home/modes";
import {
  stringifyQuery,
  useGoBack,
  useLocationQuery,
} from "../../../utils/location";
import { ios } from "../../../utils/platforms";
import MenuList from "../List";
import MenuTypeProvider from "../MenuTypeProvider";
import useMenuOpen from "../useMenuOpen";

const displayName = "MenuDrawer";

const useStyles = makeStyles(
  /* eslint-disable sort-keys */
  () => ({
    paper: {
      maxWidth: 320,
      width: "calc(100% - 56px)", // use % instead of vw for Android 4.4

      "@supports (padding: env(safe-area-inset-left))": {
        maxWidth: "calc(320px + env(safe-area-inset-left))",
        paddingTop: "env(safe-area-inset-top)",
      },
    },
  }),
  /* eslint-enable */
  { name: displayName }
);

const MenuDrawer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const classes = useStyles();

  const goBack = useGoBack();
  const query = useLocationQuery();
  const match = useMatch("/");
  const wide = useMediaQuery(theme.breakpoints.up("md"));
  const disableSwipeToOpen =
    ios ||
    wide ||
    !match ||
    !Object.keys(query).every((key) => [EDIT].includes(key));
  const open = useMenuOpen();

  const onClose = () => open && goBack();

  const onOpen = () =>
    navigate({
      ...location,
      search: stringifyQuery({
        ...query,
        menu: null,
      }),
    });

  return (
    <MenuTypeProvider type="drawer">
      <SwipeableDrawer
        data-screenshot="drawer-menu"
        disableSwipeToOpen={disableSwipeToOpen}
        onClose={onClose}
        onOpen={onOpen}
        open={open}
        PaperProps={{ className: classes.paper }}
      >
        <MenuList />
      </SwipeableDrawer>
    </MenuTypeProvider>
  );
};

MenuDrawer.displayName = displayName;

export default MenuDrawer;
