import { loadData, LoadDataRequest, Measure } from "@embeddable.com/core";
import { EmbeddedComponentMeta, Inputs, defineComponent } from "@embeddable.com/react";

// Desired:
import { TargetKPIWidget } from "@simplicate/insights";

// Workaround to get it working:
// import { TargetKPIWidget } from "../../dist/bundled.es.js";

export const meta = {
  name: "TargetKpiComponent",
  label: "Targeted KPI",
  inputs: [
    {
      name: "ds",
      type: "dataset",
      label: "Dataset",
      required: true,
    },
    {
      name: "measure",
      type: "measure",
      array: false,
      label: "Measure",
      config: { dataset: "ds" },
      required: true,
    },
    {
      name: "title",
      type: "string",
      label: "Title",
      required: true,
    },
  ],
} satisfies EmbeddedComponentMeta;

export default defineComponent(TargetKPIWidget, meta, {
  props: (inputs: Inputs<typeof meta>) => {
    const resultSet = loadData({
      from: inputs.ds,
      measures: [inputs.measure],
    } as LoadDataRequest);

    return {
      ...inputs,
      resultSet,
      measure: inputs.measure as Measure,
      title: inputs.title as string,
    };
  },
});
