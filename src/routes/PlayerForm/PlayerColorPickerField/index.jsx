import React from 'react';
import connectAdvanced from 'react-redux/es/components/connectAdvanced';
import Route from 'react-router-dom/es/Route';
import { goBack, push } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';

import ColorPickerField from '../../../components/ColorPicker/Field';

const selectorFactory = dispatch => ({ app: { activePlayerId } }, ownProps) => {
  const path = activePlayerId ? `/edit/${activePlayerId}/color` : '/new/color';

  return {
    ...ownProps,
    onClick: () => dispatch(push(path)),
    onClose: () => dispatch(goBack()),
    path,
  };
};

const PlayerColorPickerField = ({ path, ...props }) => (
  <Route path={path}>
    {({ match }) => <ColorPickerField {...props} open={Boolean(match)} />}
  </Route>
);

PlayerColorPickerField.propTypes = {
  path: PropTypes.string.isRequired,
};

export default connectAdvanced(selectorFactory)(PlayerColorPickerField);
