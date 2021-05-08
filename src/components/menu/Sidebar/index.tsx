import List from "../List";
import MenuTypeProvider, { MenuType } from "../MenuTypeProvider";

const MenuSidebar = (): JSX.Element => (
  <MenuTypeProvider type={MenuType.Sidebar}>
    <List />
  </MenuTypeProvider>
);

export default MenuSidebar;
