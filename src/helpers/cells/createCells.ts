import { Index } from "../../types/_utilities/Index";
import { Cell } from "../../types/Grid/cells/Cell";
import { cellFactory } from "./cellFactory";

export function createCells(width: number, height: number) {
  const cells: Index<Cell> = {};
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const cell = cellFactory({ x, y });
      cells[cell.id] = cell;
    }
  }
  return cells;
}
