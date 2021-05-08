import { SvgIconProps } from "@material-ui/core";
import { GenderFemale, GenderMale } from "mdi-material-ui";
import { FC } from "react";

import { sexProp } from "../../utils/propTypes";
import { Sex } from "../../utils/types";

type SexProps = SvgIconProps & {
  sex?: Sex;
};

const SexIcon: FC<SexProps> = ({ sex, ...props }) => {
  switch (sex) {
    case Sex.Female:
      return <GenderFemale {...props} />;

    case Sex.Male:
      return <GenderMale {...props} />;

    default:
      return null;
  }
};

SexIcon.propTypes = {
  sex: sexProp,
};

export default SexIcon;
