import { mdiGenderFemale, mdiGenderMale } from "@mdi/js";
import { SvgIcon, type SvgIconProps } from "@mui/material";
import { type FC } from "react";

import { Sex, sexType } from "../../domains/player";

type SexProps = {
  sex: Sex;
} & SvgIconProps;

const icons = {
  [Sex.Female]: mdiGenderFemale,
  [Sex.Male]: mdiGenderMale,
};

const SexIcon: FC<SexProps> = ({ sex, ...props }) => (
  <SvgIcon {...props}>
    <path d={icons[sex]} />
  </SvgIcon>
);

SexIcon.propTypes = {
  sex: sexType.isRequired,
};

export default SexIcon;
