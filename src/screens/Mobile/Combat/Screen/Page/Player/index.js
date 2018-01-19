import connect from 'react-redux/es/connect/connect';

import { togglePlayerGender } from '../../../../../../actions';

import Component from './Component';

const mapDispatchToProps = {
  onGenderToggle: togglePlayerGender,
};

export default connect(undefined, mapDispatchToProps)(Component);
