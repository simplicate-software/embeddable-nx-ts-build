import { ChartData } from "chart.js";
import Color from "color";
import { useMemo } from "react";

// Design tokens not available due to example purposes
const colorCommonGreen300 = "#4CAF50";
const colorCommonGrey100 = "#F5F5F5";

type SimpleTargetDataConfig = {
  min?: number;
  max?: number;
  value: number;
  target?: number;
  color?: string;
};

function fade(color: string): string {
  return new Color(color).fade(0.3).hexa();
}

function buildDataSetColors(hasTarget: boolean, customColor: string = colorCommonGreen300): string[] {
  return (hasTarget ? [customColor, colorCommonGrey100, colorCommonGrey100] : [customColor, colorCommonGrey100]).map(
    fade,
  );
}

function buildSimpleTargetDataset(value: number, min = 0, max = 100, target: number | undefined): number[] {
  const span = max - min;

  if (target !== undefined) {
    if (target <= value) {
      const targetPercentage = ((target - min) / span) * 100;
      const valuePercentage = ((value - target) / span) * 100;
      const remainder = 100 - targetPercentage - valuePercentage;

      return [targetPercentage, valuePercentage, remainder];
    } else {
      const valuePercentage = ((value - min) / span) * 100;
      const targetPercentage = ((target - value) / span) * 100;
      const remainder = 100 - targetPercentage - valuePercentage;

      return [valuePercentage, targetPercentage, remainder];
    }
  }

  const valuePercentage = ((value - min) / span) * 100;
  const remainder = max - value;
  const remainderPercentage = (remainder / span) * 100;

  return [valuePercentage, remainderPercentage];
}

/**
 * Utility hook to build a dataset for a doughnut chart representing a simple targeted KPI. The result can be used as
 * the `data` prop of a `Doughnut` chart. Resulting in a circular "progress" bar that fills from 0 percent to the
 * current value, and leaves the remaining (up until the max) unfilled, while highlighting the under- or overshoot of
 * the target.
 *
 * @param value Current value of the KPI
 * @param min The minimum possible value of the KPI -- defaults to 0
 * @param max The maximum possible value of the KPI -- defaults to 100
 * @param target [optional] The target value of the KPI
 * @returns ChartData<"doughnut", number[], unknown>
 */
export const useSimpleTargetDataset = ({
  value,
  max,
  min,
  target,
  color,
}: SimpleTargetDataConfig): ChartData<"doughnut", number[], unknown> => {
  const dataset = useMemo(() => buildSimpleTargetDataset(value, min, max, target), [value, min, max, target]);

  return useMemo(
    () => ({
      datasets: [
        {
          data: dataset,
          backgroundColor: buildDataSetColors(target !== undefined, color),
        },
      ],
    }),
    [color, dataset, target],
  );
};
