import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

const UndoContext = createContext({});

export const useUndo = () => useContext(UndoContext);

const UndoProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const value = useMemo(() => ({ message, setMessage }), [message]);

  return <UndoContext.Provider value={value}>{children}</UndoContext.Provider>;
};

UndoProvider.propTypes = {
  children: PropTypes.node,
};

export default UndoProvider;
