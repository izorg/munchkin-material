import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { Check } from '@material-ui/icons';

import Sex from '../../../../../components/Sex';

import { sexProp } from '../../../../../utils/propTypes';

const PlayerAvatar = ({ color, selected, sex, style: styleProp, ...props }) => {
  let style = { ...styleProp };

  if (!selected && color) {
    style = {
      ...style,
      backgroundColor: color,
    };
  }

  return (
    <Avatar style={style} {...props}>
      {selected ? <Check /> : <Sex sex={sex} />}
    </Avatar>
  );
};

PlayerAvatar.propTypes = {
  color: PropTypes.string,
  selected: PropTypes.bool,
  sex: sexProp.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PlayerAvatar.defaultProps = {
  color: '',
  selected: false,
  style: {},
};

export default memo(PlayerAvatar);
