/* eslint-disable */
import React, { Component } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { noop } from '../constants';

import SwordCross from './icons/SwordCross';

const messages = defineMessages({
  label: {
    id: 'combatButton.label',
    defaultMessage: 'Start a new battle',
  },
});

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
        // aria-label={intl.formatMessage(messages.label)}
        onTouchTap={this.handleCombatStart}
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
  intl: intlShape.isRequired,
  onCombatStart: PropTypes.func,
  playerId: PropTypes.number.isRequired,
};

CombatButton.defaultProps = {
  fullVersion: false,
  onCombatStart: noop,
};

export default injectIntl(CombatButton);
