import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  withStyles,
} from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import clsx from 'clsx';
import { noop } from 'lodash/fp';

const styles = {
  root: {
    paddingBottom: 0,
    paddingTop: 0,
  },
};

class InsomniaItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { keepAwake, onChange } = this.props;

    onChange(!keepAwake);
  }

  render() {
    const { classes, className, keepAwake } = this.props;

    return (
      <ListItem
        button
        className={clsx(classes.root, className)}
        onClick={this.handleClick}
      >
        <ListItemIcon>
          <PowerSettingsNew />
        </ListItemIcon>
        <ListItemText
          primary={
            <FormattedMessage defaultMessage="Keep awake" id="menu.keepAwake" />
          }
        />
        <Switch
          checked={keepAwake}
          color="primary"
          disableRipple
          tabIndex={-1}
        />
      </ListItem>
    );
  }
}

InsomniaItem.propTypes = {
  keepAwake: PropTypes.bool,
  onChange: PropTypes.func,
};

InsomniaItem.defaultProps = {
  keepAwake: false,
  onChange: noop,
};

export default withStyles(styles)(InsomniaItem);
