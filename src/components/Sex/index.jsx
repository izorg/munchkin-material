import React from 'react';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/sex';

import SexFemale from '../icons/sex/Female';
import SexMale from '../icons/sex/Male';
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
