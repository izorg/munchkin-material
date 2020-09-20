import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

const UndoContext = createContext();

export const useUndoMessage = () => useContext(UndoContext);

const UndoProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  return (
    <UndoContext.Provider value={[message, setMessage]}>
      {children}
    </UndoContext.Provider>
  );
};

UndoProvider.propTypes = {
  children: PropTypes.node,
};

export default UndoProvider;
