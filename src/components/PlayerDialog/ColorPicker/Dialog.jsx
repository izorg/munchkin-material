import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import availableColors from '../../../utils/availableColors';
import { colorType } from '../../../utils/propTypes';

import Color from './Color';

const displayName = 'ColorPickerDialog';

const useStyles = makeStyles(
  (theme) => ({
    content: {
      padding: theme.spacing(0, 1, 2),
      textAlign: 'center',
    },
  }),
  { name: displayName },
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

ColorPickerDialog.displayName = displayName;

export default ColorPickerDialog;
