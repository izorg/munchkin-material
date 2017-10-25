import React, { Component } from 'react';
import { connectAdvanced } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';
import { goBack, push } from 'react-router-redux';
import { Field } from 'redux-form';

import ColorPicker from '../components/ColorPicker';
import Dialog from '../components/ColorPicker/Dialog';

const selectorFactory = dispatch => ({ app: { activePlayerId } }, { location, ...ownProps }) => {
  const colorPath = activePlayerId ? `/edit/${activePlayerId}/color` : '/new/color';

  const match = matchPath(location.pathname, {
    path: colorPath,
  });

  return {
    ...ownProps,
    onClick: () => dispatch(push(colorPath)),
    onRequestClose: () => dispatch(goBack()),
    open: Boolean(match),
  };
};

class ColorPickerField extends Component {
  static renderComponent({
    input: { onChange, value }, onClick, onRequestClose, open,
  }) {
    return [
      <ColorPicker
        key="picker"
        onClick={onClick}
        value={value}
      />,
      <Dialog
        key="dialog"
        onRequestClose={onRequestClose}
        open={open}
        onSelect={(color) => {
          onChange(color);
          onRequestClose();
        }}
      />,
    ];
  }

  render() {
    return (
      <Field
        component={this.constructor.renderComponent}
        {...this.props}
      />
    );
  }
}

export default withRouter(connectAdvanced(selectorFactory)(ColorPickerField));
