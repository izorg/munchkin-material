import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { noop } from 'lodash';

class InsomniaItem extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { keepAwake, onChange } = this.props;

    onChange(!keepAwake);
  }

  render() {
    const { keepAwake, keepAwakeSupport } = this.props;

    return keepAwakeSupport ? (
      <Fragment>
        <Divider />
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <FormattedMessage
                id="menu.keepAwake"
                defaultMessage="Keep awake"
              />
            }
          />
          <Switch
            checked={keepAwake}
            color="primary"
            disableRipple
            tabIndex={-1}
          />
        </ListItem>
      </Fragment>
    ) : null;
  }
}

InsomniaItem.propTypes = {
  keepAwake: PropTypes.bool,
  keepAwakeSupport: PropTypes.bool,
  onChange: PropTypes.func,
};

InsomniaItem.defaultProps = {
  keepAwake: false,
  keepAwakeSupport: false,
  onChange: noop,
};

export default InsomniaItem;
