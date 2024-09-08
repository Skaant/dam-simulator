import { expect, test, vi } from "vitest";
import * as feature from "./getEqualCellsArea";
import { createCells } from "../../../helpers/cells/createCells";

test("getEqualCellsArea", () => {
  const cells = createCells(2, 2);
  cells["x0y0"].z = 0;
  cells["x0y1"].z = 0;
  cells["x1y0"].z = 0;
  cells["x1y1"].z = 1;
  const area = feature.getEqualCellsArea(cells, cells["x0y0"]);
  expect(area).toBeTruthy();
  if (area) {
    expect(area.includes("x0y0"));
    expect(area.includes("x0y1"));
    expect(area.includes("x1y0"));
  }
});
