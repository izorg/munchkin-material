import { mdiCheck } from "@mdi/js";
import { Avatar, colors, SvgIcon, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { type CSSProperties, forwardRef } from "react";

import { type AvailableColor } from "../../utils/availableColors";
import { colorType } from "../../utils/propTypes";

type PlayerAvatarProps = {
  color: AvailableColor;
  name: string;
  selected?: boolean;
  style?: CSSProperties;
};

const PlayerAvatar = forwardRef<HTMLDivElement, PlayerAvatarProps>(
  function PlayerAvatar(
    { color, name, selected = false, style: styleProp, ...props },
    ref
  ) {
    const theme = useTheme();

    let style = styleProp;

    if (!selected && color) {
      style = {
        ...style,

        backgroundColor:
          color in colors
            ? colors[color][theme.palette.mode === "dark" ? 200 : 500]
            : color,
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
