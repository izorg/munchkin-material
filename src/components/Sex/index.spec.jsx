import React from 'react';
import { shallow } from 'enzyme';
import { GenderFemale, GenderMale } from 'mdi-material-ui';
import { FEMALE, MALE } from 'munchkin-core';

import Sex from './index';

describe('<Sex />', () => {
  test('should render null', () => {
    const wrapper = shallow(<Sex />);

    expect(wrapper.equals(null)).toBe(true);
  });

  test('should render female icon', () => {
    const wrapper = shallow(<Sex sex={FEMALE} />);

    expect(wrapper.find(GenderFemale)).toHaveLength(1);
  });

  test('should render male icon', () => {
    const wrapper = shallow(<Sex sex={MALE} />);

    expect(wrapper.find(GenderMale)).toHaveLength(1);
  });
});
