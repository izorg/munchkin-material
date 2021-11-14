import List from "../List";
import MenuTypeProvider, { MenuType } from "../MenuTypeProvider";

const MenuSidebar = () => (
  <MenuTypeProvider type={MenuType.Sidebar}>
    <List />
  </MenuTypeProvider>
);

export default MenuSidebar;
