import { DIRECTIONS } from "../../../../types/Grid/Direction";
import { getCellsSlopes } from "../../../../helpers/cells/getCellsSlopes";
import { getCellsNeighbors } from "../../../../helpers/cells/getCellsNeighbors";
import { Index } from "../../../../types/_utilities/Index";
import { Cell } from "../../../../types/Grid/cells/Cell";
import { getEqualCellsArea } from "../../_helpers/getEqualCellsArea";
import { isCellFlowing } from "../isCellFlowing/isCellFlowing";

export function getFlowingWaterCells(cells: Index<Cell>) {
  const slopesCells = getCellsSlopes(getCellsNeighbors(cells!));
  return Object.values(slopesCells).filter((cell) =>
    isCellFlowing({ slopesCells }, cell.id)
  );
}
