import { colors } from "@mui/material";

const colorKeys = Object.keys(colors) as (keyof typeof colors)[];

const availableColors = colorKeys.filter(
  (color) => color !== "brown" && color !== "common",
);

export type AvailableColor = AvailableColors[number];

type AvailableColors = typeof availableColors;

export default availableColors;
