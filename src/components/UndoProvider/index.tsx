import PropTypes from "prop-types";
import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type UndoContext = {
  message: ReactNode;
  setMessage: (message: ReactNode) => void;
};

const Context = createContext<UndoContext | undefined>(undefined);

export const useUndo = (): UndoContext => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("No <UndoContext />");
  }

  return context;
};

type UndoProviderProps = {
  children?: ReactNode;
};

const UndoProvider: FC<UndoProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<ReactNode>(null);

  const value = useMemo(() => ({ message, setMessage }), [message]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

UndoProvider.propTypes = {
  children: PropTypes.node,
};

export default UndoProvider;
