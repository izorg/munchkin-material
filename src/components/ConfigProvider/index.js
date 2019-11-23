import { createContext, useContext } from 'react';

const ConfigContext = createContext({});

export default ConfigContext.Provider;

export const useConfig = () => useContext(ConfigContext);
