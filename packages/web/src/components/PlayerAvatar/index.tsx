import { mdiCheck } from "@mdi/js";
import { Avatar, colors, SvgIcon, type SxProps } from "@mui/material";
import { forwardRef } from "react";

import { type AvailableColor } from "../../utils/availableColors";

type PlayerAvatarProps = {
  color?: AvailableColor | null;
  name: string;
  selected?: boolean;
  sx?: SxProps;
};

const PlayerAvatar = forwardRef<HTMLDivElement, PlayerAvatarProps>(
  function PlayerAvatar(props, ref) {
    const { color, name, selected = false, sx = [], ...rest } = props;

    return (
      <Avatar
        ref={ref}
        sx={[
          color && !selected
            ? (theme) => ({
                backgroundColor: colors[color][500],
                ...theme.applyStyles("dark", {
                  backgroundColor: colors[color][200],
                }),
              })
            : false,
          selected ? { backgroundColor: "primary.main" } : false,
          ...(sx instanceof Array ? sx : [sx]),
        ]}
        {...rest}
      >
        {selected ? (
          <SvgIcon>
            <path d={mdiCheck} />
          </SvgIcon>
        ) : (
          [...name][0].toUpperCase()
        )}
      </Avatar>
    );
  },
);

export default PlayerAvatar;
