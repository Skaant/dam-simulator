import { DIRECTIONS } from "../../../types/Grid/Direction";
import { getCellsSlopes } from "../../../helpers/cells/getCellsSlopes";
import { getCellsNeighbors } from "../../../helpers/cells/getCellsNeighbors";
import { Index } from "../../../types/_utilities/Index";
import { Cell } from "../../../types/Grid/cells/Cell";
import { CellNeighbors } from "../../../types/Grid/cells/CellNeighbors";
import { CellSlopes } from "../../../types/Grid/cells/CellSlopes";

export function getFlowingWaterCells({
  cells,
  slopeCells,
}: {
  cells?: Index<Cell>;
  slopeCells?: Index<Cell & CellNeighbors & CellSlopes>;
}) {
  if (!(cells || slopeCells)) return [];
  return Object.values(
    slopeCells || getCellsSlopes(getCellsNeighbors(cells!))
  ).filter(
    ({ water, dams, slopes }) =>
      water &&
      DIRECTIONS.filter(
        (direction) =>
          slopes[direction] === "block" || (dams[direction] || 0) >= water
      ).length < 4
  );
}
