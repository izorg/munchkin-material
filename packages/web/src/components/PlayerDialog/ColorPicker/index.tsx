import { type Theme, useFormControl, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import {
  type FC,
  type FocusEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import { type AvailableColor } from "../../../utils/availableColors";
import { useGoBack } from "../../../utils/location";
import { colorType } from "../../../utils/propTypes";

import Color from "./Color";
import Dialog from "./Dialog";
import Popover from "./Popover";

type ColorPickerProps = {
  defaultValue?: AvailableColor;
  name: string;
  onBlur?: (event: FocusEvent) => void;
  onChange?: (color: string) => void;
  onFocus?: (event: FocusEvent) => void;
  value?: AvailableColor;
};

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const {
    defaultValue,
    name,
    onBlur,
    onChange,
    onFocus,
    value: valueProp,
  } = props;

  const muiFormControl = useFormControl();
  const [searchParams, setSearchParams] = useSearchParams();

  const anchorEl = useRef<HTMLButtonElement>(null);
  const ignoreNextBlur = useRef(false);

  const [value, setValue] = useState(defaultValue || valueProp);

  useEffect(() => {
    if (valueProp) {
      setValue(valueProp);
    }
  }, [valueProp]);

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
        ref={anchorEl}
        onBlur={(event) => {
          if (ignoreNextBlur.current) {
            // The parent components are relying on the bubbling of the event.
            event.stopPropagation();

            ignoreNextBlur.current = false;
          } else {
            if (onBlur) {
              onBlur(event);
            }

            if (muiFormControl?.onBlur) {
              // @ts-expect-error -- need to fix type
              muiFormControl.onBlur(event);
            }
          }
        }}
        onClick={() => {
          ignoreNextBlur.current = true;

          onOpen();
        }}
        onFocus={(event: FocusEvent) => {
          if (onFocus) {
            onFocus(event);
          }

          if (muiFormControl?.onFocus) {
            // @ts-expect-error -- need to fix type
            muiFormControl.onFocus(event);
          }
        }}
        onKeyDown={(event: KeyboardEvent) => {
          if ([" ", "Enter"].includes(event.key)) {
            ignoreNextBlur.current = true;
          }
        }}
        sx={{
          marginLeft: "-6px",
        }}
        value={value}
      />
      {smUp ? (
        <Popover
          anchorEl={() => anchorEl.current as HTMLButtonElement}
          onClose={onClose}
          onSelect={(color) => {
            setValue(color);

            if (onChange) {
              onChange(color);
            }

            onClose();
          }}
          open={open}
          value={value}
        />
      ) : (
        <Dialog
          onClose={onClose}
          onSelect={(color) => {
            setValue(color);

            if (onChange) {
              onChange(color);
            }

            onClose();
          }}
          open={open}
          value={value}
        />
      )}
    </>
  );
};

ColorPicker.propTypes = {
  defaultValue: colorType,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: colorType,
};

export default ColorPicker;
