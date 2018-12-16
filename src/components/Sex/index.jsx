import React from 'react';
import { GenderFemale, GenderMale } from 'mdi-material-ui';
import { FEMALE, MALE } from 'munchkin-core';

import { sexProp } from '../../utils/propTypes';

const Sex = ({ sex, ...props }) => {
  switch (sex) {
    case FEMALE:
      return <GenderFemale {...props} />;

    case MALE:
      return <GenderMale {...props} />;

    default:
      return null;
  }
};

Sex.propTypes = {
  sex: sexProp,
};

Sex.muiName = 'SvgIcon';

export default Sex;
