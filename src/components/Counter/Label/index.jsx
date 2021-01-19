import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import { useIntl } from 'react-intl';

import { EN, RU } from '../../../i18n';

const displayName = 'CounterLabel';

const munchkinFontSupportedLocales = [EN, RU];

const CounterLabel = (props) => {
  const { locale } = useIntl();
  const theme = useTheme();

  const fontFamily = munchkinFontSupportedLocales.includes(locale)
    ? `"Munchkin", ${theme.typography.fontFamily}`
    : theme.typography.fontFamily;

  return (
    <div
      css={css`
        font-family: ${fontFamily};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `}
      {...props}
    />
  );
};

CounterLabel.displayName = displayName;

export default CounterLabel;
