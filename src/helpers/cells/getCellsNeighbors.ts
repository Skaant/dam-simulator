import _ from "lodash";
import { getCellNeighbors } from "./getCellNeighbors";
import { Index } from "../../types/_utilities/Index";
import { Cell } from "../../types/Grid/cells/Cell";
import { CellNeighbors } from "../../types/Grid/cells/CellNeighbors";

export function getCellsNeighbors(cells: Index<Cell>) {
  return _.mapValues(
    cells,
    (cell) =>
      ({ ...cell, neighbors: getCellNeighbors(cell, cells) } as Cell &
        CellNeighbors)
  ) as Index<Cell & CellNeighbors>;
}
