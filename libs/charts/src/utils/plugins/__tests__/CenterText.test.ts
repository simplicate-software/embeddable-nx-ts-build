import { CenterText } from "../CenterText";

describe("CenterText", () => {
  it("saves and restores the context", () => {
    const ctx = {
      save: jest.fn(),
      restore: jest.fn(),
      fillText: jest.fn(),
    };
    const chart = {
      ctx,
      chartArea: { width: 100, height: 100, top: 0 },
    };
    const options = { centerText: "Hello world!" };

    // @ts-expect-error -- these are all just dummy values
    CenterText.afterDatasetDraw(chart, {}, options);

    expect(ctx.save).toHaveBeenCalled();
    expect(ctx.restore).toHaveBeenCalled();
  });

  it("draws the text in the center", () => {
    const ctx = {
      save: jest.fn(),
      restore: jest.fn(),
      fillText: jest.fn(),
    };
    const chart = {
      ctx,
      chartArea: { width: 100, height: 100, top: 30 },
    };
    const options = { centerText: "Hello world!" };

    // @ts-expect-error -- these are all just dummy values
    CenterText.afterDatasetDraw(chart, {}, options);

    expect(ctx.fillText).toHaveBeenCalledWith("Hello world!", 50, 80);
  });

  it("does nothing if there is no center text", () => {
    const ctx = {
      save: jest.fn(),
      restore: jest.fn(),
      fillText: jest.fn(),
    };
    const chart = {
      ctx,
      chartArea: { width: 100, height: 100, top: 30 },
    };
    const options = { centerText: undefined };

    // @ts-expect-error -- these are all just dummy values
    CenterText.afterDatasetDraw(chart, {}, options);

    expect(ctx.save).not.toHaveBeenCalled();
    expect(ctx.restore).not.toHaveBeenCalled();
    expect(ctx.fillText).not.toHaveBeenCalled();
  });
});
