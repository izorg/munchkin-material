import React from 'react';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/gender';

import GenderFemale from '../icons/gender/Female';
import GenderMale from '../icons/gender/Male';
import { genderProp } from '../../utils/propTypes';

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
  gender: genderProp.isRequired,
};

Gender.muiName = 'SvgIcon';

export default Gender;
