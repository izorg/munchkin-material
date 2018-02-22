import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';
import { noop } from 'lodash';

class InsomniaItemComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, keepAwake) {
    this.props.onChange(keepAwake);
  }

  render() {
    const { keepAwake, keepAwakeSupport } = this.props;

    return keepAwakeSupport ? (
      <ListItem>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <FormattedMessage id="menu.keepAwake" defaultMessage="Keep awake" />
          }
        />
        <ListItemSecondaryAction>
          <Switch
            checked={keepAwake}
            color="primary"
            onChange={this.handleChange}
          />
        </ListItemSecondaryAction>
      </ListItem>
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
