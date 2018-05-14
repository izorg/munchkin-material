import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { noop } from 'lodash';

import SwordCross from '../../../../components/icons/SwordCross';

class PlayerScreenCombatButtonComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { goToCombat, playerId } = this.props;

    if (playerId) {
      goToCombat(playerId);
    }
  }

  render() {
    return (
      <Button
        color="primary"
        data-screenshots="combat-button"
        onClick={this.handleClick}
        variant="fab"
      >
        <SwordCross />
      </Button>
    );
  }
}

PlayerScreenCombatButtonComponent.propTypes = {
  goToCombat: PropTypes.func,
  playerId: PropTypes.string,
};

PlayerScreenCombatButtonComponent.defaultProps = {
  goToCombat: noop,
  playerId: null,
};

export default PlayerScreenCombatButtonComponent;
