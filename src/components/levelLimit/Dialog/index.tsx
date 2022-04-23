import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { setEpic, setLevelLimit } from "../../../ducks/settings";
import { useAppDispatch } from "../../../store";
import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from "../../../utils/levelLimit";
import { useGoBack } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";
import CancelButton from "../../CancelButton";
import SubmitButton from "../../SubmitButton";
import levelLimitMessages from "../messages";

export const DEFAULT_MUNCHKIN_LIMIT = "default";
export const EPIC_MUNCHKIN_LIMIT = "epic";
export const NO_LIMIT = "no-limit";

const LevelLimitDialog = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const location = useLocation();

  const levelLimit = usePresentSelector((state) => state.settings.levelLimit);
  const epic = usePresentSelector((state) => state.settings.epic);
  const defaultValue = levelLimit
    ? epic
      ? EPIC_MUNCHKIN_LIMIT
      : DEFAULT_MUNCHKIN_LIMIT
    : NO_LIMIT;
  const [value, setValue] = useState(defaultValue);

  const open = new URLSearchParams(location.search).get("levelLimit") !== null;

  const goBack = useGoBack();
  const onClose = () => goBack();

  const onChange = (
    event: ChangeEvent<HTMLInputElement>,
    levelLimit: string
  ) => {
    setValue(levelLimit);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    switch (value) {
      case NO_LIMIT:
        dispatch(setLevelLimit(false));
        break;

      case DEFAULT_MUNCHKIN_LIMIT:
        dispatch(setEpic(false));
        dispatch(setLevelLimit(true));
        break;

      case EPIC_MUNCHKIN_LIMIT:
        dispatch(setEpic(true));
        dispatch(setLevelLimit(true));
        break;

      default:
        break;
    }

    goBack();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        component: "form",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onSubmit,
      }}
    >
      <DialogTitle>{intl.formatMessage(levelLimitMessages.label)}</DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: "1px",
        }}
      >
        <RadioGroup name="levelLimit" onChange={onChange} value={value}>
          <FormControlLabel
            control={<Radio autoFocus={value === NO_LIMIT} color="primary" />}
            label={intl.formatMessage(levelLimitMessages.none)}
            value={NO_LIMIT}
          />
          <FormControlLabel
            control={
              <Radio
                autoFocus={value === DEFAULT_MUNCHKIN_LIMIT}
                color="primary"
              />
            }
            label={intl.formatMessage(levelLimitMessages.munchkin, {
              maxLevel: MAX_LEVEL,
              minLevel: MIN_LEVEL,
            })}
            value={DEFAULT_MUNCHKIN_LIMIT}
          />
          <FormControlLabel
            control={
              <Radio
                autoFocus={value === EPIC_MUNCHKIN_LIMIT}
                color="primary"
              />
            }
            label={intl.formatMessage(levelLimitMessages.epic, {
              maxLevel: MAX_EPIC_LEVEL,
              minLevel: MIN_LEVEL,
            })}
            value={EPIC_MUNCHKIN_LIMIT}
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <SubmitButton />
      </DialogActions>
    </Dialog>
  );
};

export default LevelLimitDialog;
