import { FEMALE, MALE } from "./sex";

type Sex = "female" | "male";

const toggleSex = (sex: Sex): Sex => {
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
