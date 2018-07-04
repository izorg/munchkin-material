import { FEMALE, MALE } from 'munchkin-core';

import SexFemale from '../components/icons/sex/Female';
import SexMale from '../components/icons/sex/Male';

export default function(sex) {
  switch (sex) {
    case FEMALE:
      return SexFemale;

    case MALE:
      return SexMale;

    default:
      return null;
  }
}
