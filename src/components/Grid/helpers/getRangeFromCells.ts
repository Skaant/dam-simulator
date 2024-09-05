import { Cell } from "../../../types/Grid/cells/Cell";

export function getRangeFromCells(cells: Cell[]) {
  let xMin = 0;
  let xMax = 0;
  let yMin = 0;
  let yMax = 0;
  cells.forEach(({ x, y }) => {
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  });
  return [xMin, xMax, yMin, yMax];
}
