import { connect } from 'react-redux';
import { replace } from 'connected-react-router/lib/actions';

import Component from './Component';

const mapStateToProps = (state) => ({
  theme: state.app.theme,
});

const mapDispatchToProps = {
  onClick: () => replace({ search: '?theme' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
