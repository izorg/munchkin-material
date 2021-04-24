import List from "../List";
import MenuTypeProvider from "../MenuTypeProvider";

const displayName = "MenuSidebar";

const MenuSidebar = () => (
  <MenuTypeProvider type="sidebar">
    <List />
  </MenuTypeProvider>
);

MenuSidebar.displayName = displayName;

export default MenuSidebar;
