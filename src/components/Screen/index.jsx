import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ScreenDialog from './Dialog';

let screenAppear = false;

class ScreenLoader extends Component {
  componentDidMount() {
    if (!screenAppear) {
      screenAppear = true;
    }
  }

  render() {
    const {
      appear: appearProp,
      component: ComponentProp,
      nextScreen,
      match,
      ...rest
    } = this.props;

    const appear = appearProp !== undefined ? appearProp : screenAppear;

    return (
      <ScreenDialog open={Boolean(match)} TransitionProps={{ appear }}>
        <ComponentProp match={match} {...rest} />
      </ScreenDialog>
    );
  }
}

ScreenLoader.propTypes = {
  component: PropTypes.func.isRequired,
  match: PropTypes.object,
  nextScreen: PropTypes.func,
};

ScreenLoader.defaultProps = {
  match: null,
  nextScreen: undefined,
};

export default ScreenLoader;
