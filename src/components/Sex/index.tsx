import { SvgIcon, SvgIconProps } from "@material-ui/core";
import { mdiGenderFemale, mdiGenderMale } from "@mdi/js";
import { FC } from "react";

import { sexProp } from "../../utils/propTypes";
import { Sex } from "../../utils/types";

type SexProps = SvgIconProps & {
  sex?: Sex;
};

const SexIcon: FC<SexProps> = ({ sex, ...props }) => {
  switch (sex) {
    case Sex.Female:
      return (
        <SvgIcon {...props}>
          <path d={mdiGenderFemale} />
        </SvgIcon>
      );

    case Sex.Male:
      return (
        <SvgIcon {...props}>
          <path d={mdiGenderMale} />
        </SvgIcon>
      );

    default:
      return null;
  }
};

SexIcon.propTypes = {
  sex: sexProp,
};

export default SexIcon;
