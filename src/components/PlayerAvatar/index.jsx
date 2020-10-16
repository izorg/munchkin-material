import { Avatar } from '@material-ui/core';
import { Check } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { colorType } from '../../utils/propTypes';

const displayName = 'PlayerAvatar';

const PlayerAvatar = forwardRef(
  ({ color, name, selected, style: styleProp, ...props }, ref) => {
    let style = styleProp;

    if (!selected && color) {
      style = {
        ...style,
        backgroundColor: color,
      };
    }

    return (
      <Avatar ref={ref} style={style} {...props}>
        {selected ? <Check /> : Array.from(name)[0].toUpperCase()}
      </Avatar>
    );
  },
);

PlayerAvatar.propTypes = {
  color: colorType.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

PlayerAvatar.defaultProps = {
  selected: false,
};

PlayerAvatar.displayName = displayName;

export default PlayerAvatar;
