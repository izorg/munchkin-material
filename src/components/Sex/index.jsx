import React from 'react';
import SexFemale from 'mdi-material-ui/GenderFemale';
import SexMale from 'mdi-material-ui/GenderMale';
import { FEMALE, MALE } from 'munchkin-core';

import { sexProp } from '../../utils/propTypes';

const Sex = ({ sex, ...props }) => {
  switch (sex) {
    case FEMALE:
      return <SexFemale {...props} />;

    case MALE:
      return <SexMale {...props} />;

    default:
      return null;
  }
};

Sex.propTypes = {
  sex: sexProp,
};

Sex.muiName = 'SvgIcon';

export default Sex;
