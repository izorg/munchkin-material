import { Hidden, makeStyles } from '@material-ui/core';
import { goBack, push } from 'connected-react-router';
import { noop } from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getQuery, stringifyQuery } from '../../../utils/location';

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
  const classes = useStyles();
  const dispatch = useDispatch();

  const anchorEl = useRef(null);
  const ignoreNextBlur = useRef(false);

  const [value, setValue] = useState(defaultValue || valueProp);

  useEffect(() => {
    if (valueProp) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const query = useSelector(getQuery);

  const open = query.color === null;

  const onOpen = () =>
    dispatch(
      push({
        search: stringifyQuery({
          ...query,
          color: null,
        }),
      }),
    );
  const onClose = () => dispatch(goBack());

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
