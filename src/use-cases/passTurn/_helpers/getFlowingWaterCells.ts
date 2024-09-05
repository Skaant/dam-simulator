import { DIRECTIONS } from "../../../types/Grid/Direction";
import { getCellsSlopes } from "../../../helpers/cells/getCellsSlopes";
import { getCellsNeighbors } from "../../../helpers/cells/getCellsNeighbors";
import { Index } from "../../../types/_utilities/Index";
import { Cell } from "../../../types/Grid/cells/Cell";

export function getFlowingWaterCells(cells: Index<Cell>) {
  return Object.values(getCellsSlopes(getCellsNeighbors(cells))).filter(
    ({ water, dams, slopes }) =>
      water &&
      DIRECTIONS.filter(
        (direction) =>
          slopes[direction] === "block" || (dams[direction] || 0) >= water
      ).length < 4
  );
}
