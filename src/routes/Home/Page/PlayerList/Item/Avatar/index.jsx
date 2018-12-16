import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { Check } from '@material-ui/icons';

class PlayerAvatar extends PureComponent {
  render() {
    const {
      children,
      color,
      selected,
      style: styleProp,
      ...props
    } = this.props;

    let style = { ...styleProp };

    if (!selected && color) {
      style = {
        ...style,
        backgroundColor: color,
      };
    }

    return (
      <Avatar style={style} {...props}>
        {selected ? <Check /> : children}
      </Avatar>
    );
  }
}

PlayerAvatar.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  style: PropTypes.object,
};

PlayerAvatar.defaultProps = {
  children: null,
  color: '',
  name: '',
  selected: false,
  style: {},
};

export default PlayerAvatar;
