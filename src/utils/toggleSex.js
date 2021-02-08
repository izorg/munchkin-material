import { FEMALE, MALE } from "./sex";

const toggleSex = (sex) => {
  switch (sex) {
    case FEMALE:
      return MALE;

    case MALE:
      return FEMALE;

    default:
      return sex;
  }
};

export default toggleSex;
