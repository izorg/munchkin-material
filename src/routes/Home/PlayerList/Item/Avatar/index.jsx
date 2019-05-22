import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { Check } from 'mdi-material-ui';

import Sex from '../../../../../components/Sex';

import { colorType, sexProp } from '../../../../../utils/propTypes';

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
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PlayerAvatar.defaultProps = {
  selected: false,
  style: {},
};

export default PlayerAvatar;
