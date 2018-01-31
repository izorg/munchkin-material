import connect from 'react-redux/es/connect/connect';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import formActions from 'redux-form/lib/actions';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';

import { form } from '../Form/Component';

import Component from './Component';

const contextTypes = {
  playerId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  edit: Boolean(ownProps.playerId),
});

const mapDispatchToProps = {
  onCancel: goBack,
  onSubmit: () => formActions.submit(form),
};

export default compose(
  getContext(contextTypes),
  connect(mapStateToProps, mapDispatchToProps),
)(Component);
