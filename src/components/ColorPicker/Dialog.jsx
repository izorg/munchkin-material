import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/es/Avatar';
import ButtonBase from 'material-ui/es/ButtonBase';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/es/Dialog';
import * as colors from 'material-ui/es/colors';
import { withStyles } from 'material-ui/es/styles';

import { noop } from '../../constants';
import { classesObject } from '../../utils/propTypes';

const { common, yellow, ...availableColors } = colors;

const styles = ({ spacing: { unit } }) => ({
  button: {
    borderRadius: '50%',
    height: 48,
    padding: 0,
    width: 48,
  },

  content: {
    padding: [0, unit, unit * 2],
    textAlign: 'center',
  },

  color: {
    height: 36,
    width: 36,
  },
});

const ColorPickerDialog = ({ classes, onSelect, ...props }) => (
  <Dialog key="dialog" {...props}>
    <DialogTitle>
      <FormattedMessage id="colorPicker.dialog.title" defaultMessage="Choose color" />
    </DialogTitle>
    <DialogContent className={classes.content}>
      {Object.keys(availableColors).map(key => (
        <ButtonBase className={classes.button} focusRipple key={key}>
          <Avatar
            className={classes.color}
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
