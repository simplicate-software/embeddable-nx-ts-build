import { Plugin } from "chart.js";
import Color from "color";

const colorCommonBlue300 = "example-color";
const colorCommonBrand300 = "example-color";
const colorCommonGreen300 = "example-color";
const colorCommonGrey300 = "example-color";
const colorCommonOrange300 = "example-color";
const colorCommonRed300 = "example-color";
const colorModulesYellow300 = "example-color";

const COLORS = [
  colorCommonBlue300,
  colorCommonRed300,
  colorCommonGreen300,
  colorCommonOrange300,
  colorCommonBrand300,
  colorModulesYellow300,
  colorCommonGrey300,
] as const;

export const Colors = {
  id: "colors",
  beforeLayout: (chart) => {
    chart.config.data.datasets.forEach((dataset, index) => {
      const backgroundColor = new Color(COLORS[index % COLORS.length]).fade(0.3).hexa();

      dataset.backgroundColor ??= backgroundColor;
      dataset.borderColor ??= COLORS[index % COLORS.length];
    });
  },
} satisfies Plugin;
