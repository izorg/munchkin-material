import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';
import { noop } from 'lodash';

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
          <PersonIcon />
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
