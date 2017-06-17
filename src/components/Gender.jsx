import React from 'react';
import PropTypes from 'prop-types';
import { GENDER } from 'munchkin';

import GenderFemale from './icons/gender/Female';
import GenderMale from './icons/gender/Male';

const Gender = ({ gender, ...props }) => {
  switch (gender) {
    case GENDER.FEMALE:
      return <GenderFemale {...props} />;

    case GENDER.MALE:
      return <GenderMale {...props} />;

    default:
      return null;
  }
};

Gender.propTypes = {
  gender: PropTypes.oneOf(Object.values(GENDER)).isRequired,
};

export default Gender;
