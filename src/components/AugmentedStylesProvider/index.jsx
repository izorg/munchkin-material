import { StylesProvider } from '@material-ui/core';
import {
  jssPreset,
  StylesProvider as JssStylesProvider,
} from '@material-ui/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { getDirection } from '../../i18n';

const displayName = 'AugmentedStylesProvider';

const AugmentedStylesProvider = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);
  const enabled = direction === 'rtl';

  const jss = useMemo(
    () =>
      create({
        plugins: [...jssPreset().plugins, rtl({ enabled })],
      }),
    [enabled],
  );

  return (
    <StylesProvider injectFirst>
      <JssStylesProvider jss={jss}>{children}</JssStylesProvider>
    </StylesProvider>
  );
};

AugmentedStylesProvider.propTypes = {
  children: PropTypes.node,
};

AugmentedStylesProvider.displayName = displayName;

export default AugmentedStylesProvider;
