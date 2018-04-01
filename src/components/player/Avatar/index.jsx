import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import NavigationCheck from 'material-ui-icons/Check';

class PlayerAvatar extends PureComponent {
  render() {
    const { color, name, selected, style, ...props } = this.props;

    let avatarStyle = { ...style };

    if (!selected && color) {
      avatarStyle = {
        ...avatarStyle,
        backgroundColor: color,
      };
    }

    return (
      <Avatar style={avatarStyle} {...props}>
        {selected ? (
          <NavigationCheck />
        ) : (
          String.fromCodePoint(name.codePointAt(0)).toUpperCase()
        )}
      </Avatar>
    );
  }
}

PlayerAvatar.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  style: PropTypes.object,
};

PlayerAvatar.defaultProps = {
  color: '',
  name: '',
  selected: false,
  style: {},
};

export default PlayerAvatar;
