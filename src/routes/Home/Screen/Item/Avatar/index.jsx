import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import NavigationCheck from 'material-ui-icons/Check';

import { classesObject } from '../../../../../utils/propTypes';

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.primary[500],
  },
});

const PlayerListItemAvatar = ({
  classes, color, name, selected, ...props
}) => {
  if (selected) {
    return (
      <Avatar
        className={classes.avatar}
        {...props}
      >
        <NavigationCheck />
      </Avatar>
    );
  }

  const style = {};

  if (color) {
    style.backgroundColor = color;
  }

  return (
    <Avatar
      className={classes.avatar}
      style={style}
      {...props}
    >
      {String.fromCodePoint(name.codePointAt(0)).toUpperCase()}
    </Avatar>
  );
};

PlayerListItemAvatar.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  color: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
};

PlayerListItemAvatar.defaultProps = {
  color: '',
  name: '',
  selected: false,
};

export default withStyles(styles)(PlayerListItemAvatar);
