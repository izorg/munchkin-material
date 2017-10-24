import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/Button';

import { noop } from '../../constants/index';

import SwordCross from '../icons/SwordCross';

class FabCombat extends Component {
  componentWillMount() {
    this.handleCombatStart = this.handleCombatStart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { fullVersion, onClick } = nextProps;

    if (!this.props.fullVersion && fullVersion) {
      onClick();
    }
  }

  handleCombatStart() {
    const { fullVersion, onClick } = this.props;
    const { buyFullVersion } = this.context;

    if (fullVersion) {
      onClick();
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

FabCombat.contextTypes = {
  buyFullVersion: PropTypes.func,
};

FabCombat.propTypes = {
  fullVersion: PropTypes.bool,
  onClick: PropTypes.func,
};

FabCombat.defaultProps = {
  fullVersion: false,
  onClick: noop,
};

export default FabCombat;
