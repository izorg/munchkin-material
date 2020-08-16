import { Hidden, makeStyles, useFormControl } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  stringifyQuery,
  useGoBack,
  useLocationQuery,
} from '../../../utils/location';
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
  const muiFormControl = useFormControl();

  const classes = useStyles();

  const anchorEl = useRef(null);
  const ignoreNextBlur = useRef(false);

  const [value, setValue] = useState(defaultValue || valueProp);

  useEffect(() => {
    if (valueProp) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const goBack = useGoBack();
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

  const onClose = () => goBack();

  return (
    <>
      <input name={name} type="hidden" value={value} />
      <Color
        ref={anchorEl}
        className={classes.color}
        onBlur={(event) => {
          if (ignoreNextBlur.current === true) {
            // The parent components are relying on the bubbling of the event.
            event.stopPropagation();

            ignoreNextBlur.current = false;
          } else {
            onBlur(event);

            if (muiFormControl && muiFormControl.onBlur) {
              muiFormControl.onBlur(event);
            }
          }
        }}
        onClick={() => {
          ignoreNextBlur.current = true;

          onOpen();
        }}
        onFocus={(event) => {
          onFocus(event);

          if (muiFormControl && muiFormControl.onFocus) {
            muiFormControl.onFocus(event);
          }
        }}
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
