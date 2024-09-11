import { Ref } from "../../../types/_utilities/Ref";
import { Cell } from "../../../types/Grid/cells/Cell";
import { CellNeighbors } from "../../../types/Grid/cells/CellNeighbors";
import { CellSlopes } from "../../../types/Grid/cells/CellSlopes";

export function getAreaFlowingCells(
  cells: Cell & CellNeighbors & CellSlopes,
  area: Ref<Cell>
) {}
