import { Chart as ChartJS, ChartData, BarElement, CategoryScale, LinearScale, ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { initialize } from "../../utils/initialize";
import styles from "./Bar.chart.module.scss";

initialize();

ChartJS.register(CategoryScale, LinearScale, BarElement);

const DEFAULT_OPTIONS: ChartOptions<"bar"> = {
  plugins: {
    legend: {
      align: "start",
      position: "bottom",
    },
  },
  datasets: {
    bar: {
      maxBarThickness: 32,
      barPercentage: 0.9,
      categoryPercentage: 0.9,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

type Options = {
  orientation?: "horizontal" | "vertical";
  stacked?: true;
};

type BarChartProps<TData extends number[], TLabel> = {
  data: ChartData<"bar", TData, TLabel>;
  config?: Options;
};

const configureAxisMaximum =
  (max: number) =>
  (options: ChartOptions<"bar">): ChartOptions<"bar"> => {
    return {
      ...options,
      scales: {
        ...options.scales,
        y: {
          ...options.scales?.y,
          suggestedMax: max,
        },
        x: {
          ...options.scales?.x,
          suggestedMax: max,
        },
      },
    };
  };

function configureOrientation(options: ChartOptions<"bar">, config?: Options): ChartOptions<"bar"> {
  if (config?.orientation === "vertical") {
    return options;
  }

  return {
    ...options,
    indexAxis: "y",
    plugins: {
      ...options.plugins,
      tooltip: {
        xAlign: "left",
        yAlign: "center",
      },
    },
    datasets: {
      ...options.datasets,
      bar: {
        ...options.datasets?.bar,
        barPercentage: 0.5,
      },
    },
  };
}

function configureStacking(options: ChartOptions<"bar">, config?: Options): ChartOptions<"bar"> {
  if (!config?.stacked) {
    return options;
  }

  return {
    ...options,
    scales: {
      ...options.scales,
      y: {
        ...options.scales?.y,
        stacked: true,
      },
      x: {
        ...options.scales?.x,
        stacked: true,
      },
    },
  };
}

export const BarChart = <TData extends number[], TLabel>({ data, config }: BarChartProps<TData, TLabel>) => {
  const finalOptions = useMemo(() => {
    const maxValue = Math.max(...data.datasets.flatMap((dataset) => dataset.data));

    // Add 5% to the max value to make sure the top of the bar does not touch the edge of the chart
    const suggestedMax = maxValue * 1.05;

    return [configureAxisMaximum(suggestedMax), configureOrientation, configureStacking].reduce(
      (options, next) => next(options, config),
      DEFAULT_OPTIONS,
    );
  }, [data, config]);

  return (
    <div className={styles.chart}>
      <Bar data={data} options={finalOptions} />
    </div>
  );
};
