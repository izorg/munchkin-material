import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';

import availableColors from '../../../utils/availableColors';
import { colorType } from '../../../utils/propTypes';

import Color from './Color';

const useStyles = makeStyles(
  (theme) => ({
    content: {
      padding: theme.spacing(0, 1, 2),
      textAlign: 'center',
    },
  }),
  { name: 'ColorPickerDialog' },
);

const ColorPickerDialog = ({ onSelect, value, ...props }) => {
  const classes = useStyles();

  return (
    <Dialog {...props}>
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Choose color"
          id="colorPicker.dialog.title"
        />
      </DialogTitle>
      <DialogContent className={classes.content}>
        {availableColors.map((color) => (
          <Color
            key={color}
            onClick={() => onSelect(color)}
            selected={value === color}
            value={color}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};

ColorPickerDialog.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: colorType.isRequired,
};

export default ColorPickerDialog;
