import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/Button';

import { noop } from '../../constants/index';

import SwordCross from '../icons/SwordCross';

class CombatButton extends Component {
  componentWillMount() {
    this.handleCombatStart = this.handleCombatStart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { fullVersion, onCombatStart, playerId } = nextProps;

    if (!this.props.fullVersion && fullVersion) {
      onCombatStart(playerId);
    }
  }

  handleCombatStart() {
    const { fullVersion, onCombatStart, playerId } = this.props;
    const { buyFullVersion } = this.context;

    if (fullVersion) {
      onCombatStart(playerId);
    } else {
      buyFullVersion();
    }
  }

  render() {
    return (
      <FloatingActionButton
        color="primary"
        fab
        onClick={this.handleCombatStart}
      >
        <SwordCross />
      </FloatingActionButton>
    );
  }
}

CombatButton.contextTypes = {
  buyFullVersion: PropTypes.func,
};

CombatButton.propTypes = {
  fullVersion: PropTypes.bool,
  onCombatStart: PropTypes.func,
  playerId: PropTypes.number.isRequired,
};

CombatButton.defaultProps = {
  fullVersion: false,
  onCombatStart: noop,
};

export default CombatButton;
