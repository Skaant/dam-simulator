import { DIRECTIONS } from "../../../types/Grid/Direction";
import { getCellsSlopes } from "../../../helpers/cells/getCellsSlopes";
import { getCellsNeighbors } from "../../../helpers/cells/getCellsNeighbors";
import { Index } from "../../../types/_utilities/Index";
import { Cell } from "../../../types/Grid/cells/Cell";
import { getEqualCellsArea } from "./getEqualCellsArea";

export function getFlowingWaterCells(cells: Index<Cell>) {
  return Object.values(getCellsSlopes(getCellsNeighbors(cells!))).filter(
    ({ id, water, dams, slopes }) =>
      water &&
      DIRECTIONS.filter((direction) => {
        const area =
          slopes[direction] === "equal" && getEqualCellsArea(cells, cells[id]);
        const equalsFlowing =
          area &&
          area.map((id) => cells[id].water).some((_water) => water !== _water);
        area &&
          console.log(
            area.map((id) => cells[id].water),
            equalsFlowing
          );
        return (
          slopes[direction] === "block" ||
          equalsFlowing ||
          (dams[direction] || 0) >= water
        );
      }).length < 4
  );
}
