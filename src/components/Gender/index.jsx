import React from 'react';
import PropTypes from 'prop-types';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/gender';

import GenderFemale from '../icons/gender/Female';
import GenderMale from '../icons/gender/Male';

const Gender = ({ gender, ...props }) => {
  switch (gender) {
    case FEMALE:
      return <GenderFemale {...props} />;

    case MALE:
      return <GenderMale {...props} />;

    default:
      return null;
  }
};

Gender.propTypes = {
  gender: PropTypes.oneOf([FEMALE, MALE]).isRequired,
};

Gender.muiName = 'SvgIcon';

export default Gender;
