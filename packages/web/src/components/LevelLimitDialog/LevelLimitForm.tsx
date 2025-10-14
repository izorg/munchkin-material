import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import {
  type ComponentPropsWithoutRef,
  type FormEvent,
  useCallback,
  useRef,
} from "react";
import { useIntl } from "react-intl";

import { setEpic, setLevelLimit } from "../../ducks/settings";
import usePresentSelector from "../../hooks/usePresentSelector";
import levelLimitMessages from "../../messages/levelLimit";
import { useAppDispatch } from "../../store";
import { MAX_EPIC_LEVEL, MAX_LEVEL, MIN_LEVEL } from "../../utils/levelLimit";

const DEFAULT_MUNCHKIN_LIMIT = "default";
const EPIC_MUNCHKIN_LIMIT = "epic";
const NO_LIMIT = "no-limit";

type LevelLimit =
  | typeof DEFAULT_MUNCHKIN_LIMIT
  | typeof EPIC_MUNCHKIN_LIMIT
  | typeof NO_LIMIT;

type LevelLimitFormProps = ComponentPropsWithoutRef<"form">;

export const LevelLimitForm = (props: LevelLimitFormProps) => {
  const { onSubmit: onSubmitProp, ...rest } = props;

  const intl = useIntl();

  const dispatch = useAppDispatch();

  const defaultValueRef = useRef(
    usePresentSelector((state) => {
      if (!state.settings.levelLimit) {
        return NO_LIMIT;
      }

      if (state.settings.epic) {
        return EPIC_MUNCHKIN_LIMIT;
      }

      return DEFAULT_MUNCHKIN_LIMIT;
    }),
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);

      const formValues = Object.fromEntries(formData) as {
        levelLimit: LevelLimit;
      };

      switch (formValues.levelLimit) {
        case DEFAULT_MUNCHKIN_LIMIT: {
          dispatch(setEpic(false));
          dispatch(setLevelLimit(true));
          break;
        }

        case EPIC_MUNCHKIN_LIMIT: {
          dispatch(setEpic(true));
          dispatch(setLevelLimit(true));
          break;
        }

        case NO_LIMIT: {
          dispatch(setLevelLimit(false));
          break;
        }
      }

      onSubmitProp?.(event);
    },
    [dispatch, onSubmitProp],
  );

  return (
    <form {...rest} onSubmit={onSubmit}>
      {/* eslint-disable-next-line react-hooks/refs -- will fix later */}
      <RadioGroup defaultValue={defaultValueRef.current} name="levelLimit">
        <FormControlLabel
          control={<Radio color="primary" />}
          label={intl.formatMessage(levelLimitMessages.none)}
          value={NO_LIMIT}
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          label={intl.formatMessage(levelLimitMessages.munchkin, {
            maxLevel: MAX_LEVEL,
            minLevel: MIN_LEVEL,
          })}
          value={DEFAULT_MUNCHKIN_LIMIT}
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          label={intl.formatMessage(levelLimitMessages.epic, {
            maxLevel: MAX_EPIC_LEVEL,
            minLevel: MIN_LEVEL,
          })}
          value={EPIC_MUNCHKIN_LIMIT}
        />
      </RadioGroup>
    </form>
  );
};
