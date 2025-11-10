import { type FC, type PropsWithChildren } from "react";

import { VersionContext } from "../../../../web/src/utils/versionContext";

const VersionProvider: FC<PropsWithChildren> = ({ children }) => (
  <VersionContext.Provider value={globalThis.BuildInfo.version}>
    {children}
  </VersionContext.Provider>
);

export default VersionProvider;
