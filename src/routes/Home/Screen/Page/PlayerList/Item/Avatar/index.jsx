import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import NavigationCheck from 'material-ui-icons/Check';

import { classesObject } from '../../../../../../../utils/propTypes';

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.primary[500],
  },
});

const HomeScreenPagePlayerListItemAvatar = ({
  classes, color, name, selected, style, ...props
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
      className={classes.avatar}
      style={avatarStyle}
      {...props}
    >
      {selected ? <NavigationCheck /> : String.fromCodePoint(name.codePointAt(0)).toUpperCase()}
    </Avatar>
  );
};

HomeScreenPagePlayerListItemAvatar.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
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

export default withStyles(styles)(HomeScreenPagePlayerListItemAvatar);
