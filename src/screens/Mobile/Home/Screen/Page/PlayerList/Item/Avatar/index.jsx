import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import NavigationCheck from 'material-ui-icons/Check';

const HomeScreenPagePlayerListItemAvatar = ({
  color, name, selected, style, ...props
}) => {
  let avatarStyle = { ...style };

  if (!selected && color) {
    avatarStyle = {
      ...avatarStyle,
      backgroundColor: color,
    };
  }

  return (
    <Avatar
      style={avatarStyle}
      {...props}
    >
      {selected ? <NavigationCheck /> : String.fromCodePoint(name.codePointAt(0)).toUpperCase()}
    </Avatar>
  );
};

HomeScreenPagePlayerListItemAvatar.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  style: PropTypes.object,
};

HomeScreenPagePlayerListItemAvatar.defaultProps = {
  color: '',
  name: '',
  selected: false,
  style: {},
};

export default HomeScreenPagePlayerListItemAvatar;
