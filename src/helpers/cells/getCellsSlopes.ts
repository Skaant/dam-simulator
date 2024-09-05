import _ from "lodash";
import { getCellSlopes } from "./getCellSlopes";
import { Index } from "../../types/_utilities/Index";
import { Cell } from "../../types/Grid/cells/Cell";
import { CellNeighbors } from "../../types/Grid/cells/CellNeighbors";
import { CellSlopes } from "../../types/Grid/cells/CellSlopes";

export function getCellsSlopes(cells: Index<Cell & CellNeighbors>) {
  return _.mapValues(cells, (cell) => getCellSlopes(cell, cells)) as Index<
    Cell & CellNeighbors & CellSlopes
  >;
}
