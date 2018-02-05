import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router/lib/actions';

import ColorPickerField from '../../../../../components/ColorPicker/Field';

const mapStateToprops = (state) => ({
  open: state.router.location.search === '?color',
});

const mapDispatchToProps = {
  onClick: () => push({ search: '?color' }),
  onClose: goBack,
};

export default connect(mapStateToprops, mapDispatchToProps)(ColorPickerField);
