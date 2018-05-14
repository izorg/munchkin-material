import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';

import availableColors from './availableColors';
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
