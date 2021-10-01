import { mdiCheck } from "@mdi/js";
import { Avatar, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { CSSProperties, forwardRef } from "react";

import { colorType } from "../../utils/propTypes";

type PlayerAvatarProps = {
  color: string;
  name: string;
  selected?: boolean;
  style?: CSSProperties;
};

const PlayerAvatar = forwardRef<HTMLDivElement, PlayerAvatarProps>(
  function PlayerAvatar(
    { color, name, selected = false, style: styleProp, ...props },
    ref
  ) {
    let style = styleProp;

    if (!selected && color) {
      style = {
        ...style,

        backgroundColor: color,
      };
    }

    return (
      <Avatar ref={ref} style={style} {...props}>
        {selected ? (
          <SvgIcon>
            <path d={mdiCheck} />
          </SvgIcon>
        ) : (
          Array.from(name)[0].toUpperCase()
        )}
      </Avatar>
    );
  }
);

PlayerAvatar.propTypes = {
  color: colorType.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  style: PropTypes.object,
};

export default PlayerAvatar;
