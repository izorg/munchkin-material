import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { noop } from 'lodash';

import SwordCross from '../../../../components/icons/SwordCross';

class PlayerScreenCombatButtonComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { fullVersion, goToCombat, playerId } = nextProps;

    if (!this.props.fullVersion && fullVersion && playerId) {
      goToCombat(playerId);
    }
  }

  handleClick() {
    const { buyFullVersion, fullVersion, goToCombat, playerId } = this.props;

    if (!fullVersion) {
      buyFullVersion();
    } else if (playerId) {
      goToCombat(playerId);
    }
  }

  render() {
    return (
      <Button color="primary" onClick={this.handleClick} variant="fab">
        <SwordCross />
      </Button>
    );
  }
}

PlayerScreenCombatButtonComponent.propTypes = {
  buyFullVersion: PropTypes.func,
  fullVersion: PropTypes.bool,
  goToCombat: PropTypes.func,
  playerId: PropTypes.string,
};

PlayerScreenCombatButtonComponent.defaultProps = {
  buyFullVersion: noop,
  fullVersion: false,
  goToCombat: noop,
  playerId: null,
};

export default PlayerScreenCombatButtonComponent;
