import { Sex } from "./types";

const toggleSex = (sex: Sex): Sex => {
  switch (sex) {
    case Sex.Female:
      return Sex.Male;

    case Sex.Male:
      return Sex.Female;

    default:
      return sex;
  }
};

export default toggleSex;
