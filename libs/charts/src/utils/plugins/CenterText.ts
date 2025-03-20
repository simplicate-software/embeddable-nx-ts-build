import { ChartTypeRegistry, Plugin } from "chart.js";

type CenterTextOptions = {
  centerText?: string;
};

declare module "chart.js" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- required for declaration merging
  interface PluginOptionsByType<TType extends keyof ChartTypeRegistry> {
    centerText: CenterTextOptions;
  }
}

export const CenterText = {
  id: "centerText",
  defaults: {
    centerText: undefined,
  },
  afterDatasetDraw: (chart, _, options: CenterTextOptions) => {
    if (!options.centerText) {
      return;
    }

    const fontSize = 24; // fontSize8
    const { ctx, chartArea } = chart;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.font = `${fontSize}px Work Sans`;

    ctx.fillText(options.centerText, chartArea.width / 2, chartArea.height / 2 + chartArea.top);

    ctx.restore();
  },
} satisfies Plugin;
