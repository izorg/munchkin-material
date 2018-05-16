import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/Person';
import { noop } from 'lodash';

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
    const { singleMode } = this.props;

    return (
      <Fragment>
        <Divider />
        <ListItem
          button
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
      </Fragment>
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

export default SingleModeItem;
