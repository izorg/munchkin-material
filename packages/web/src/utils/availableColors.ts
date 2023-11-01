import { colors } from "@mui/material";

const colorKeys = Object.keys(colors) as (keyof typeof colors)[];

const availableColors = colorKeys.filter(
  (color): color is Exclude<(typeof colorKeys)[number], "brown" | "common"> =>
    color !== "brown" && color !== "common",
);

export type AvailableColors = typeof availableColors;

export type AvailableColor = AvailableColors[number];

export default availableColors;
