import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  withStyles,
} from '@material-ui/core';
import { noop } from 'lodash/fp';

import availableColors from '../../../utils/availableColors';

import Color from './Color';

const styles = ({ spacing: { unit } }) => ({
  content: {
    padding: [0, unit, unit * 2],
    textAlign: 'center',
  },
});

const ColorPickerDialog = ({ classes, onSelect, value, ...props }) => (
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

ColorPickerDialog.propTypes = {
  onSelect: PropTypes.func,
  value: PropTypes.string.isRequired,
};

ColorPickerDialog.defaultProps = {
  onSelect: noop,
};

export default withStyles(styles)(ColorPickerDialog);
