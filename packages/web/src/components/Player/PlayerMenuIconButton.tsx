import { mdiDotsVertical } from "@mdi/js";
import { type IconButtonProps, Menu, SvgIcon } from "@mui/material";
import { type FC, type MouseEventHandler, useState } from "react";

import TopIconButton from "../TopIconButton";

import { PlayerDeleteMenuItem } from "./PlayerDeleteMenuItem";

export const PlayerMenuIconButton: FC<IconButtonProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose: MouseEventHandler = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TopIconButton onClick={onClick} {...props}>
        <SvgIcon>
          <path d={mdiDotsVertical} />
        </SvgIcon>
      </TopIconButton>
      <Menu
        anchorEl={anchorEl}
        onClose={onClose}
        open={open}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <PlayerDeleteMenuItem onClick={onClose} />
      </Menu>
    </>
  );
};
