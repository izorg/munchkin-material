import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash/fp';

import availableColors from '../../../../../utils/availableColors';

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
