import { expect, test } from "vitest";
import { getEqualCellsArea } from "./getEqualCellsArea";
import { createCells } from "../../../helpers/cells/createCells";

test("getEqualCellsArea 2x2", () => {
  const cells = createCells(2, 2, { z: 0 });
  cells["x1y1"].z = 1;
  const area = getEqualCellsArea({ cells }, "x0y0");
  expect(area).toBeTruthy();
  if (area) {
    expect(area.includes("x0y0"));
    expect(area.includes("x0y1"));
    expect(area.includes("x1y0"));
  }
});
test("getEqualCellsArea 3x4", () => {
  const cells = createCells(3, 4, { z: 1 });
  cells["x0y0"].z = 2;
  cells["x0y2"].z = 2;
  cells["x1y3"].z = 2;
  cells["x2y0"].z = 2;
  cells["x2y2"].z = 2;
  cells["x1y1"].z = 0;
  cells["x1y2"].z = 0;
  const res1 = getEqualCellsArea({ cells }, "x1y1");
  expect(res1).toBeTruthy();
  if (res1) {
    expect(res1.includes("x1y1"));
    expect(res1.includes("x1y2"));
  }
});
