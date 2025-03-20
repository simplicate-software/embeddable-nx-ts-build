import { Colors } from "../Colors";

describe("Colors", () => {
  it("assigns colors to datasets", () => {
    const chart = { config: { data: { datasets: [{}, {}, {}] } } };

    // @ts-expect-error -- The chart is just a dummy object
    Colors.beforeLayout(chart);

    chart.config.data.datasets.forEach((dataset) => {
      // @ts-expect-error -- The chart is just a dummy object
      expect(dataset.backgroundColor).toBeDefined();
      // @ts-expect-error -- The chart is just a dummy object
      expect(dataset.borderColor).toBeDefined();
    });
  });

  it("skips datasets with predefined colors", () => {
    const chart = {
      config: {
        data: {
          datasets: [
            { backgroundColor: "identifiable color", borderColor: "different color" },
            { backgroundColor: "identifiable color", borderColor: "different color" },
            { backgroundColor: "identifiable color", borderColor: "different color" },
          ],
        },
      },
    };

    // @ts-expect-error -- The chart is just a dummy object
    Colors.beforeLayout(chart);

    chart.config.data.datasets.forEach((dataset) => {
      expect(dataset.backgroundColor).toBeDefined();
      expect(dataset.backgroundColor).toStrictEqual("identifiable color");
      expect(dataset.borderColor).toBeDefined();
      expect(dataset.borderColor).toStrictEqual("different color");
    });
  });

  it("cycles through a preset of colors", () => {
    const CYCLE_LENGTH = 7;
    const chart = { config: { data: { datasets: new Array(2 * CYCLE_LENGTH).fill(null).map(() => ({})) } } };

    // @ts-expect-error -- The chart is just a dummy object
    Colors.beforeLayout(chart);

    const firstHalf = chart.config.data.datasets.slice(0, CYCLE_LENGTH);
    const lastHalf = chart.config.data.datasets.slice(CYCLE_LENGTH);

    expect(firstHalf).toStrictEqual(lastHalf);
  });
});
