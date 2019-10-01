import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { EN, RU } from '../../../i18n';

const munchkinFontSupportedLocales = [EN, RU];

const useStyles = makeStyles(
  (theme) => ({
    label: {
      fontFamily: ({ locale }) =>
        munchkinFontSupportedLocales.includes(locale)
          ? `"Munchkin", ${theme.typography.fontFamily}`
          : theme.typography.fontFamily,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'CounterLabel' },
);

const CounterLabel = ({ className, ...props }) => {
  const { locale } = useIntl();
  const classes = useStyles({ locale });

  return <div className={clsx(classes.label, className)} {...props} />;
};

export default CounterLabel;
