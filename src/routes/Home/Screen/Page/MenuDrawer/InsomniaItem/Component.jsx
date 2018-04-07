import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { noop } from 'lodash';

class InsomniaItemComponent extends PureComponent {
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

InsomniaItemComponent.propTypes = {
  keepAwake: PropTypes.bool,
  keepAwakeSupport: PropTypes.bool,
  onChange: PropTypes.func,
};

InsomniaItemComponent.defaultProps = {
  keepAwake: false,
  keepAwakeSupport: false,
  onChange: noop,
};

export default InsomniaItemComponent;
