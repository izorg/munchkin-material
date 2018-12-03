import SexFemale from 'mdi-material-ui/GenderFemale';
import SexMale from 'mdi-material-ui/GenderMale';
import { FEMALE, MALE } from 'munchkin-core';

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
