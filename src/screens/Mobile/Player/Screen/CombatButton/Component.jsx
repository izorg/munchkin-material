import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import noop from '../../../../../utils/noop';

import SwordCross from '../../../../../components/icons/SwordCross';

class PlayerScreenCombatButtonComponent extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { fullVersion, onClick } = nextProps;

    if (!this.props.fullVersion && fullVersion) {
      onClick();
    }
  }

  render() {
    const { onClick } = this.props;

    return (
      <Button
        color="primary"
        fab
        onClick={onClick}
      >
        <SwordCross />
      </Button>
    );
  }
}

PlayerScreenCombatButtonComponent.propTypes = {
  fullVersion: PropTypes.bool,
  onClick: PropTypes.func,
};

PlayerScreenCombatButtonComponent.defaultProps = {
  fullVersion: false,
  onClick: noop,
};

export default PlayerScreenCombatButtonComponent;
