import { FEMALE, MALE } from 'munchkin-core/es/constants/gender';

import GenderFemale from '../components/icons/gender/Female';
import GenderMale from '../components/icons/gender/Male';

export default function (gender) {
  switch (gender) {
    case FEMALE:
      return GenderFemale;

    case MALE:
      return GenderMale;

    default:
      return null;
  }
}
