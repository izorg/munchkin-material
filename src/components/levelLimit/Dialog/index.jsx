import { css } from "@emotion/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { setEpic, setLevelLimit } from "../../../ducks/settings";
import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from "../../../utils/levelLimit";
import { useGoBack, useLocationQuery } from "../../../utils/location";
import CancelButton from "../../CancelButton";
import SubmitButton from "../../SubmitButton";
import levelLimitMessages from "../messages";

const displayName = "LevelLimitDialog";

export const DEFAULT_MUNCHKIN_LIMIT = "default";
export const EPIC_MUNCHKIN_LIMIT = "epic";
export const NO_LIMIT = "no-limit";

const LevelLimitDialog = (props) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const levelLimit = useSelector((state) => state.present.settings.levelLimit);
  const epic = useSelector((state) => state.present.settings.epic);
  const defaultValue = levelLimit
    ? epic
      ? EPIC_MUNCHKIN_LIMIT
      : DEFAULT_MUNCHKIN_LIMIT
    : NO_LIMIT;
  const [value, setValue] = useState(defaultValue);

  const query = useLocationQuery();
  const open = query.levelLimit !== undefined;

  const goBack = useGoBack();
  const onClose = () => goBack();

  const onChange = (event, levelLimit) => {
    setValue(levelLimit);
  };

  const onSubmit = (event) => {
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
        onSubmit,
      }}
      {...props}
    >
      <DialogTitle>{intl.formatMessage(levelLimitMessages.label)}</DialogTitle>
      <DialogContent
        css={css`
          padding-bottom: 1px;
        `}
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

LevelLimitDialog.displayName = displayName;

export default LevelLimitDialog;
