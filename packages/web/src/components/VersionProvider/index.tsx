import { type FC, type PropsWithChildren } from "react";

import { VersionContext } from "../../utils/versionContext";

const VersionProvider: FC<PropsWithChildren> = ({ children }) => (
  <VersionContext.Provider value={process.env.VERSION ?? "development"}>
    {children}
  </VersionContext.Provider>
);

export default VersionProvider;
