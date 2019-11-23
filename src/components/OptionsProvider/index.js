import { createContext, useContext } from 'react';

const OptionsContext = createContext({});

export default OptionsContext.Provider;

export const useOptions = () => useContext(OptionsContext);
