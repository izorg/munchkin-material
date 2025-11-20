import { type Theme, useMediaQuery } from "@mui/material";
import { unstable_useControlled as useControlled } from "@mui/utils";
import { type FC, useRef } from "react";
import { useSearchParams } from "react-router";

import { type AvailableColor } from "../../../utils/availableColors";
import { useGoBack } from "../../../utils/location";

import Color from "./Color";
import Dialog from "./Dialog";
import Popover from "./Popover";

type ColorPickerProps = {
  defaultValue?: AvailableColor;
  name: string;
  value?: AvailableColor;
};

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const { defaultValue, name, value: valueProp } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const anchorEl = useRef<HTMLButtonElement>(null);

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "ColorPicker",
    state: "value",
  });

  const goBack = useGoBack();

  const open = searchParams.get("color") !== null;

  const onOpen = () => {
    setSearchParams((prev) => {
      prev.set("color", "");

      return prev;
    });
  };

  const onClose = () => goBack();

  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <input name={name} type="hidden" value={value} />
      <Color
        onClick={onOpen}
        ref={anchorEl}
        sx={{
          marginLeft: "-6px",
        }}
        value={value}
      />
      {smUp ? (
        <Popover
          anchorEl={() => anchorEl.current}
          onClose={onClose}
          onSelect={async (color) => {
            setValue(color);

            await onClose();
          }}
          open={open}
          value={value}
        />
      ) : (
        <Dialog
          onClose={onClose}
          onSelect={async (color) => {
            setValue(color);

            await onClose();
          }}
          open={open}
          value={value}
        />
      )}
    </>
  );
};

export default ColorPicker;
