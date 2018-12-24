import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  withStyles,
} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import cns from 'classnames';
import { noop } from 'lodash/fp';

const styles = {
  root: {
    paddingBottom: 0,
    paddingTop: 0,
  },
};

class SingleModeItem extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onChange, singleMode } = this.props;

    onChange(!singleMode);
  }

  render() {
    const { classes, className, singleMode } = this.props;

    return (
      <ListItem
        button
        className={cns(classes.root, className)}
        data-screenshots="single-mode-item"
        onClick={this.handleClick}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText
          primary={
            <FormattedMessage
              id="menu.singleMode"
              defaultMessage="Single mode"
            />
          }
        />
        <Switch
          checked={singleMode}
          color="primary"
          disableRipple
          tabIndex={-1}
        />
      </ListItem>
    );
  }
}

SingleModeItem.propTypes = {
  onChange: PropTypes.func,
  singleMode: PropTypes.bool,
};

SingleModeItem.defaultProps = {
  onChange: noop,
  singleMode: false,
};

export default withStyles(styles)(SingleModeItem);
