import usePresentSelector from "../hooks/usePresentSelector";

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 10;
export const MAX_EPIC_LEVEL = 20;

export const useLevelRange = () => {
  const levelLimit = usePresentSelector((state) => state.settings.levelLimit);
  const epic = usePresentSelector((state) => state.settings.epic);

  const valueRange: { maxValue?: number; minValue?: number } = {};

  if (levelLimit) {
    valueRange.minValue = MIN_LEVEL;
    valueRange.maxValue = MAX_LEVEL;

    if (epic) {
      valueRange.maxValue = MAX_EPIC_LEVEL;
    }
  }

  return valueRange;
};
