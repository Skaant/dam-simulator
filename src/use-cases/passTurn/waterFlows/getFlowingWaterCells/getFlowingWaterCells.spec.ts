import { expect, test } from "vitest";
import { getFlowingWaterCells } from "./getFlowingWaterCells";
import { createCells } from "../../../../helpers/cells/createCells";

test("getFlowingWaterCells equal behavior", () => {
  const cells = createCells(3, 4, { z: 1 });
  cells["x1y1"].z = 0;
  cells["x1y1"].water = 1;
  cells["x1y2"].z = 0;
  cells["x1y2"].water = 1;
  const res1 = getFlowingWaterCells(cells);
  expect(res1.some(({ id }) => id === "x1y1" || id === "x1y2")).toEqual(false);
  cells["x1y0"].water = 1.33;
  const res2 = getFlowingWaterCells(cells);
  console.log(res2);
  expect(res2.filter(({ id }) => ["x1y1", "x1y2"].includes(id)).length).toEqual(
    2
  );
});
