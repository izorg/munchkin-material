import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/es/Button';

import { noop } from '../../constants';

import SwordCross from '../icons/SwordCross';

class CombatFab extends PureComponent {
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

CombatFab.propTypes = {
  fullVersion: PropTypes.bool,
  onClick: PropTypes.func,
};

CombatFab.defaultProps = {
  fullVersion: false,
  onClick: noop,
};

export default CombatFab;
