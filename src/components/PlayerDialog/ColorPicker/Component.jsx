import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { noop } from 'lodash/fp';

import Color from './Color';
import Dialog from './Dialog';
import Popover from './Popover';

const useStyles = makeStyles(
  {
    color: {
      marginLeft: -6,
    },
  },
  { name: 'ColorPicker' },
);

const ColorPicker = ({
  name,
  onBlur,
  onChange,
  onClose,
  onFocus,
  onOpen,
  open,
  value,
}) => {
  const classes = useStyles();

  const anchorEl = useRef(null);
  const ignoreNextBlur = useRef(false);

  return (
    <>
      <Color
        ref={anchorEl}
        className={classes.color}
        name={name}
        onBlur={(event) => {
          if (ignoreNextBlur.current === true) {
            // The parent components are relying on the bubbling of the event.
            event.stopPropagation();

            ignoreNextBlur.current = false;
          } else {
            onBlur(event);
          }
        }}
        onClick={() => {
          ignoreNextBlur.current = true;

          onOpen();
        }}
        onFocus={onFocus}
        onKeyDown={(event) => {
          if ([' ', 'Enter'].includes(event.key)) {
            ignoreNextBlur.current = true;
          }
        }}
        value={value}
      />
      <Hidden smUp>
        <Dialog
          onClose={onClose}
          onSelect={(color) => {
            onChange(color);
            onClose();
          }}
          open={open}
          value={value}
        />
      </Hidden>
      <Hidden xsDown>
        <Popover
          anchorEl={() => anchorEl.current}
          onClose={onClose}
          onSelect={(color) => {
            onChange(color);
            onClose();
          }}
          open={open}
          value={value}
        />
      </Hidden>
    </>
  );
};

ColorPicker.propTypes = {
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onFocus: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  onBlur: noop,
  onChange: noop,
  onClose: noop,
  onFocus: noop,
  onOpen: noop,
  open: false,
  value: '',
};

export default ColorPicker;
