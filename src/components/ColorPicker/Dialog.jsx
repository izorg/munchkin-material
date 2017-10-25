import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import ButtonBase from 'material-ui/ButtonBase';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import * as colors from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

import { noop } from '../../constants';
import { classesObject } from '../../utils/propTypes';

const { common, yellow, ...availableColors } = colors;

const styles = ({ spacing: { unit } }) => ({
  button: {
    borderRadius: '50%',
    padding: unit,
  },

  content: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: [0, unit, unit * 2],
  },

  dialog: {
    maxWidth: 240,
  },
});

const ColorPickerDialog = ({ classes, onSelect, ...props }) => (
  <Dialog
    classes={{ paper: classes.dialog }}
    key="dialog"
    {...props}
  >
    <DialogTitle>
      <FormattedMessage id="colorPicker.dialog.title" defaultMessage="Choose color" />
    </DialogTitle>
    <DialogContent className={classes.content}>
      {Object.keys(availableColors).map(key => (
        <ButtonBase className={classes.button} key={key}>
          <Avatar
            onClick={() => onSelect(availableColors[key][500])}
            style={{ backgroundColor: availableColors[key][500] }}
          />
        </ButtonBase>
      ))}
    </DialogContent>
  </Dialog>
);

ColorPickerDialog.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  onSelect: PropTypes.func,
};

ColorPickerDialog.defaultProps = {
  onSelect: noop,
};

export default withStyles(styles)(ColorPickerDialog);
