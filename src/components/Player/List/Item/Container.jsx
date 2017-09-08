import React, { Component } from 'react';
import Tappable from 'react-tappable/lib/Tappable';
import PropTypes from 'prop-types';
import cns from 'classnames';

// eslint-disable-next-line react/prefer-stateless-function
class PlayerListItemContainer extends Component {
  render() {
    const { className, ...rest } = this.props;

    return (
      <Tappable
        {...rest}
        className={cns(className, 'tappable')}
        component="li"
        pressDelay={500}
      />
    );
  }
}

PlayerListItemContainer.propTypes = {
  className: PropTypes.string,
};

PlayerListItemContainer.defaultProps = {
  className: '',
};

export default PlayerListItemContainer;
