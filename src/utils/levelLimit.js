export const MIN_LEVEL = 1;
export const MAX_LEVEL = 10;
export const MAX_EPIC_LEVEL = 20;

export const isLevelDecrementDisabled = (level, levelLimit) =>
  levelLimit && level <= MIN_LEVEL;

export const isLevelIncrementDisabled = (level, levelLimit, epic) =>
  levelLimit &&
  ((!epic && level >= MAX_LEVEL) || (epic && level >= MAX_EPIC_LEVEL));
