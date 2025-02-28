import { expect, test } from "vitest";
import { createCells } from "../../../../helpers/cells/createCells";
import { getFirstFlowingCell } from "./getFirstFlowingCell";
import { getCellsSlopes } from "../../../../helpers/cells/getCellsSlopes";
import { getCellsNeighbors } from "../../../../helpers/cells/getCellsNeighbors";

test("Base case", () => {
  const cells = createCells(2, 2, {
    z: 0,
    water: 1,
  });
  cells["x1y1"].z = 1;
  expect(
    getFirstFlowingCell(getCellsSlopes(getCellsNeighbors(cells)))?.id
  ).toEqual("x1y1");
});
test("Exclude some cells ref", () => {
  const cells = createCells(2, 1, {
    z: 0,
    water: 1,
  });
  expect(
    getFirstFlowingCell(getCellsSlopes(getCellsNeighbors(cells)), ["x0y0"])?.id
  ).toEqual("x1y0");
});
