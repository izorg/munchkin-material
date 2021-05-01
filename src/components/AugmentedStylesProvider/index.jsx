import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { StylesProvider } from "@material-ui/core";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { getDirection } from "../../i18n";

const displayName = "AugmentedStylesProvider";

const ltrCache = createCache({
  key: "ltr",
  prepend: true,
  stylisPlugins: [prefixer],
});

const rtlCache = createCache({
  key: "rtl",
  prepend: true,
  stylisPlugins: [prefixer, rtlPlugin],
});

const AugmentedStylesProvider = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);

  return (
    <StylesProvider injectFirst>
      <CacheProvider value={direction === "rtl" ? rtlCache : ltrCache}>
        {children}
      </CacheProvider>
    </StylesProvider>
  );
};

AugmentedStylesProvider.propTypes = {
  children: PropTypes.node,
};

AugmentedStylesProvider.displayName = displayName;

export default AugmentedStylesProvider;
