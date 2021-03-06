import { createContext, ReactNode, useContext } from "react";

export enum MenuType {
  Drawer = "drawer",
  Sidebar = "sidebar",
}

const Context = createContext(MenuType.Drawer);

export const useMenuType = (): MenuType => useContext(Context);

type MenuTypeProviderProps = {
  children: ReactNode;
  type: MenuType;
};

const MenuTypeProvider = ({
  children,
  type,
}: MenuTypeProviderProps): JSX.Element => (
  <Context.Provider value={type}>{children}</Context.Provider>
);

export default MenuTypeProvider;
