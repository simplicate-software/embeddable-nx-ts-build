import { DataResponse, Measure } from "@embeddable.com/core";
import { DoughnutChart, useSimpleTargetDataset } from "@simplicate/charts";

type TargetKPIWidgetProps = {
  measure: Measure;
  title: string;
  resultSet: DataResponse;
};

export const TargetKPIWidget = ({ title, resultSet, measure }: TargetKPIWidgetProps) => {
  const { data } = resultSet;

  const key = measure?.name;
  const value = (data?.[0]?.[key] as number) ?? 0;

  const dataset = useSimpleTargetDataset({ value });
  const centerText = `${value.toFixed(0)}%`;

  return (
    <div>
      <h3>{title}</h3>
      <DoughnutChart data={dataset} centerText={centerText} />
    </div>
  );
};
