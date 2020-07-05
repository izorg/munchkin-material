import { Hidden, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { stringifyQuery, useLocationQuery } from '../../../utils/location';
import noop from '../../../utils/noop';

import Color from './Color';
import Dialog from './Dialog';
import Popover from './Popover';

const displayName = 'ColorPicker';

const useStyles = makeStyles(
  {
    color: {
      marginLeft: -6,
    },
  },
  { name: displayName },
);

const ColorPicker = ({
  defaultValue,
  name,
  onBlur,
  onChange,
  onFocus,
  value: valueProp,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const classes = useStyles();

  const anchorEl = useRef(null);
  const ignoreNextBlur = useRef(false);

  const [value, setValue] = useState(defaultValue || valueProp);

  useEffect(() => {
    if (valueProp) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const query = useLocationQuery();

  const open = query.color === null;

  const onOpen = () =>
    navigate({
      ...location,
      search: stringifyQuery({
        ...query,
        color: null,
      }),
    });

  const onClose = () => navigate(-1);

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
            setValue(color);
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
            setValue(color);
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
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  defaultValue: undefined,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  value: '',
};

ColorPicker.displayName = displayName;

export default ColorPicker;
