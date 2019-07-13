import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { EN, RU } from '../../../i18n';

const munchkinFontSupportedLocales = [EN, RU];

const useStyles = makeStyles(
  (theme) => ({
    label: {
      fontFamily: munchkinFontSupportedLocales.includes(theme.locale)
        ? `"Munchkin", ${theme.typography.fontFamily}`
        : undefined,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'CounterLabel' },
);

const CounterLabel = ({ className, ...props }) => {
  const classes = useStyles();

  return <div className={clsx(classes.label, className)} {...props} />;
};

export default CounterLabel;
