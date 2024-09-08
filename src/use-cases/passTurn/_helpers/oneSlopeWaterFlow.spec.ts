import { expect, test } from "vitest";
import { oneSlopeWaterFlows } from "./oneSlopeWaterFlows";
import { createCells } from "../../../helpers/cells/createCells";

test("oneSlopeWaterFlow", () => {
  let cells = createCells(2, 2);
  cells["x0y0"].z = 0;
  cells["x0y1"].z = 0;
  cells["x0y1"].water = 1;
  cells["x1y0"].z = 0;
  cells["x1y0"].water = 0;
  cells["x1y1"].z = 0;
  cells = oneSlopeWaterFlows(cells, "x0y0", 1);
  expect(cells["x0y1"].water).toBe(1.25);
  expect(cells["x1y0"].water).toBe(0.25);
});
