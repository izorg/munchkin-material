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
import { useLocation, useNavigate } from "react-router-dom";

import { useGoBack } from "../../../utils/location";

import Color from "./Color";
import Dialog from "./Dialog";
import Popover from "./Popover";

type ColorPickerProps = {
  defaultValue?: string;
  name: string;
  onBlur?: (event: FocusEvent) => void;
  onChange?: (color: string) => void;
  onFocus?: (event: FocusEvent) => void;
  value?: string;
};

const ColorPicker: FC<ColorPickerProps> = ({
  defaultValue,
  name,
  onBlur,
  onChange,
  onFocus,
  value: valueProp,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const muiFormControl = useFormControl();

  const anchorEl = useRef<HTMLButtonElement>(null);
  const ignoreNextBlur = useRef(false);

  const [value, setValue] = useState(defaultValue || valueProp);

  useEffect(() => {
    if (valueProp) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const goBack = useGoBack();

  const open = new URLSearchParams(location.search).get("color") !== null;

  const onOpen = () => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set("color", "");

    navigate({
      search: `?${searchParams.toString()}`,
    });
  };

  const onClose = () => goBack();

  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <input name={name} type="hidden" value={value} />
      <Color
        ref={anchorEl}
        onBlur={(event: FocusEvent<HTMLButtonElement>) => {
          if (ignoreNextBlur.current) {
            // The parent components are relying on the bubbling of the event.
            event.stopPropagation();

            ignoreNextBlur.current = false;
          } else {
            if (onBlur) {
              onBlur(event);
            }

            if (muiFormControl && muiFormControl.onBlur) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
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

          if (muiFormControl && muiFormControl.onFocus) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
          onSelect={(color: string) => {
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
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
};

export default ColorPicker;
