import { mdiCheck } from "@mdi/js";
import { Avatar, colors, SvgIcon, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { type CSSProperties, forwardRef, useMemo } from "react";

import { type AvailableColor } from "../../utils/availableColors";
import { colorType } from "../../utils/propTypes";

type PlayerAvatarProps = {
  color?: AvailableColor | null;
  name: string;
  selected?: boolean;
  style?: CSSProperties;
};

const PlayerAvatar = forwardRef<HTMLDivElement, PlayerAvatarProps>(
  function PlayerAvatar(props, ref) {
    const { color, name, selected = false, style: styleProp, ...rest } = props;

    const theme = useTheme();

    const style = useMemo(() => {
      if (selected || !color) {
        return styleProp;
      }

      return {
        ...styleProp,
        backgroundColor:
          colors[color][theme.palette.mode === "dark" ? 200 : 500],
      };
    }, [color, selected, styleProp, theme.palette.mode]);

    return (
      <Avatar ref={ref} style={style} {...rest}>
        {selected ? (
          <SvgIcon>
            <path d={mdiCheck} />
          </SvgIcon>
        ) : (
          [...name][0].toUpperCase()
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
