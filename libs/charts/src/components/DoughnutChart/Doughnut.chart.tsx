import { Chart as ChartJS, ChartData, ChartOptions, ArcElement } from "chart.js";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { initialize } from "../../utils";
import { CenterText } from "../../utils/plugins";
import styles from "./Doughnut.chart.module.scss";

initialize();

ChartJS.register(ArcElement, CenterText);
ChartJS.defaults.elements.arc.borderWidth = 0;

type ChartConfigOptions = { centerText?: string };
type DoughnutChartProps<TData extends number[], TLabel> = ChartConfigOptions & {
  data: ChartData<"doughnut", TData, TLabel>;
};

const DefaultDoughnutOptions: ChartOptions<"doughnut"> = {
  /**
   * The donut chart is designed at 120x120 pixels (7.5rem).
   * By design the thickness of the donut is 16px (1rem).
   * The thickness should be subtracted twice from the overall size of the chart to get the size of the cutout.
   * Then we convert this to a percentage to make the thickness feel consistent across different sizes of charts.
   */
  cutout: `${100 - (2 / 7.5) * 100}%`,
  responsive: true,
  maintainAspectRatio: true,

  /**
   * Configure chartjs to render the chart in a 5x resolution compared to the device resolution. This improves the
   * quality of the chart when zoomed in on the page.
   */
  devicePixelRatio: 5,
};

function buildChartOptions({ centerText }: ChartConfigOptions): ChartOptions<"doughnut"> {
  return {
    ...DefaultDoughnutOptions,
    plugins: {
      centerText: {
        centerText,
      },
      tooltip: { enabled: false },
    },
  };
}

export const DoughnutChart = <TData extends number[], TLabel>({
  data,
  ...configOptions
}: DoughnutChartProps<TData, TLabel>) => {
  const options = useMemo(() => buildChartOptions(configOptions), [configOptions]);

  return <Doughnut className={styles.chart} data={data} options={options} />;
};
