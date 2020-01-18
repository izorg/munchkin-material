import { GenderFemale, GenderMale } from 'mdi-material-ui';
import React from 'react';

import { sexProp } from '../../utils/propTypes';
import { FEMALE, MALE } from '../../utils/sex';

const displayName = 'Sex';

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

Sex.defaultProps = {
  sex: undefined,
};

Sex.displayName = displayName;

Sex.muiName = 'SvgIcon';

export default Sex;
