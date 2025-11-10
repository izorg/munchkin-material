import { mdiCheck } from "@mdi/js";
import { Avatar, type AvatarProps, colors, SvgIcon } from "@mui/material";

import { type AvailableColor } from "../../utils/availableColors";

type PlayerAvatarProps = {
  color?: AvailableColor | null;
  name: string;
  selected?: boolean;
} & Omit<AvatarProps, "color">;

const PlayerAvatar = (props: PlayerAvatarProps) => {
  const { color, name, selected = false, sx = [], ...rest } = props;

  return (
    <Avatar
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
};

export default PlayerAvatar;
