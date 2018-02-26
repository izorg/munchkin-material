import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import PersonIcon from 'material-ui-icons/Person';
import { noop } from 'lodash';

class SingleModeItemComponent extends PureComponent {
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
        <ListItem button onClick={this.handleClick}>
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

SingleModeItemComponent.propTypes = {
  onChange: PropTypes.func,
  singleMode: PropTypes.bool,
};

SingleModeItemComponent.defaultProps = {
  onChange: noop,
  singleMode: false,
};

export default SingleModeItemComponent;
