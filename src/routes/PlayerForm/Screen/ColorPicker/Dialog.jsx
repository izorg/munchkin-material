import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import * as colors from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import { noop } from 'lodash';

import Color from './Color';

const { common, yellow, ...availableColors } = colors;

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
        id="colorPicker.dialog.title"
        defaultMessage="Choose color"
      />
    </DialogTitle>
    <DialogContent className={classes.content}>
      {Object.keys(availableColors).map((color) => (
        <Color
          key={color}
          onClick={() => onSelect(availableColors[color][500])}
          selected={value === availableColors[color][500]}
          value={availableColors[color][500]}
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
