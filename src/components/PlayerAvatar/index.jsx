import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { Check } from 'mdi-material-ui';

import { colorType, sexProp } from '../../utils/propTypes';

import Sex from '../Sex';

const PlayerAvatar = forwardRef(
  ({ color, selected, sex, style: styleProp, ...props }, ref) => {
    let style = styleProp;

    if (!selected && color) {
      style = {
        ...style,
        backgroundColor: color,
      };
    }

    return (
      <Avatar ref={ref} style={style} {...props}>
        {selected ? <Check /> : <Sex sex={sex} />}
      </Avatar>
    );
  },
);

PlayerAvatar.propTypes = {
  color: colorType.isRequired,
  selected: PropTypes.bool,
  sex: sexProp.isRequired,
};

PlayerAvatar.defaultProps = {
  selected: false,
};

PlayerAvatar.displayName = 'PlayerAvatar';

export default PlayerAvatar;
