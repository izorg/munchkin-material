import { GenderFemale, GenderMale } from 'mdi-material-ui';
import { FEMALE, MALE } from 'munchkin-core';

export default function(sex) {
  switch (sex) {
    case FEMALE:
      return GenderFemale;

    case MALE:
      return GenderMale;

    default:
      return null;
  }
}
