import { goBack, push } from 'connected-react-router';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Hidden, makeStyles } from '@material-ui/core';
import { noop } from 'lodash/fp';

import { getQuery, stringifyQuery } from '../../../utils/location';

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

const ColorPicker = ({ name, onBlur, onChange, onFocus, value }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const anchorEl = useRef(null);
  const ignoreNextBlur = useRef(false);

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
  onFocus: PropTypes.func,
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  value: '',
};

export default ColorPicker;
