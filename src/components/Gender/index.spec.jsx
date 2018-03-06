import React from 'react';
import { shallow } from 'enzyme';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/gender';

import GenderFemale from '../icons/gender/Female';
import GenderMale from '../icons/gender/Male';

import Gender from './index';

describe('<Gender />', () => {
  test('should render null', () => {
    const wrapper = shallow(<Gender />);

    expect(wrapper.equals(null)).toBe(true);
  });

  test('should render female icon', () => {
    const wrapper = shallow(<Gender gender={FEMALE} />);

    expect(wrapper.find(GenderFemale)).toHaveLength(1);
  });

  test('should render male icon', () => {
    const wrapper = shallow(<Gender gender={MALE} />);

    expect(wrapper.find(GenderMale)).toHaveLength(1);
  });
});
