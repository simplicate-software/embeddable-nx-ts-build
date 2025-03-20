/* istanbul ignore file -- This sets some defaults for the chart library */
import { Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Colors } from "./plugins";

const colorCommonGrey800 = "example-color"; 
const fontFamilyBody = "example-color";
const lightColorTextDefault = "example-color"; 

const DEFAULT_FONT_SIZE = 16 * 0.75; // fontSize2
const DEFAULT_LINE_HEIGHT = (1.25 * 16) / DEFAULT_FONT_SIZE; // lineHeight3
const DEFAULT_FONT_WEIGHT = 400; // fontWeightRegular;
const DEFAULT_FONT_FAMILY = fontFamilyBody;

let isInitialized = false;

export function initialize() {
  if (isInitialized) {
    return;
  }

  ChartJS.register(Colors, Title, Legend, Tooltip);

  ChartJS.defaults.backgroundColor = "transparent";
  ChartJS.defaults.color = lightColorTextDefault;
  ChartJS.defaults.font = {
    family: DEFAULT_FONT_FAMILY,
    size: DEFAULT_FONT_SIZE,
    lineHeight: DEFAULT_LINE_HEIGHT,
    weight: DEFAULT_FONT_WEIGHT,
  };

  ChartJS.defaults.plugins.tooltip.titleFont = {
    family: DEFAULT_FONT_FAMILY,
    size: DEFAULT_FONT_SIZE,
    weight: 500,
    lineHeight: 16 / 12,
  };
  ChartJS.defaults.plugins.tooltip.bodyFont = {
    family: DEFAULT_FONT_FAMILY,
    size: DEFAULT_FONT_SIZE,
    weight: DEFAULT_FONT_WEIGHT,
    lineHeight: 16 / 12,
  };
  ChartJS.defaults.plugins.tooltip.displayColors = true;
  ChartJS.defaults.plugins.tooltip.boxPadding = 4;
  ChartJS.defaults.plugins.tooltip.padding = 8;
  ChartJS.defaults.plugins.tooltip.xAlign = "center";
  ChartJS.defaults.plugins.tooltip.yAlign = "bottom";
  ChartJS.defaults.plugins.tooltip.backgroundColor = colorCommonGrey800;
  ChartJS.defaults.plugins.tooltip.cornerRadius = 4;

  ChartJS.defaults.plugins.legend.labels.boxWidth = 16;
  ChartJS.defaults.plugins.legend.labels.boxHeight = 16;
  ChartJS.defaults.plugins.legend.labels.padding = 8;
  ChartJS.defaults.plugins.legend.labels.borderRadius = 4;
  ChartJS.defaults.plugins.legend.labels.useBorderRadius = true;

  isInitialized = true;
}
