import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar, ButtonBase, makeStyles } from '@material-ui/core';
import { Check } from 'mdi-material-ui';
import clsx from 'clsx';

const useStyles = makeStyles(
  {
    button: {
      borderRadius: '50%',
      height: 48,
      padding: 0,
      width: 48,
    },

    color: {
      height: 36,
      margin: '0 auto',
      width: 36,
    },
  },
  { name: 'Color' },
);

const Color = forwardRef(({ className, selected, value, ...props }, ref) => {
  const classes = useStyles();

  return (
    <ButtonBase
      ref={ref}
      centerRipple
      className={clsx(classes.button, className)}
      focusRipple
      value={value}
      {...props}
    >
      <Avatar className={classes.color} style={{ backgroundColor: value }}>
        {selected && <Check />}
      </Avatar>
    </ButtonBase>
  );
});

Color.propTypes = {
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

Color.defaultProps = {
  selected: false,
};

export default Color;
