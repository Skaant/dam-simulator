import { getCellsNeighbors } from "../../../../helpers/cells/getCellsNeighbors";
import { getCellsSlopes } from "../../../../helpers/cells/getCellsSlopes";
import { Index } from "../../../../types/_utilities/Index";
import { Ref } from "../../../../types/_utilities/Ref";
import { Cell } from "../../../../types/Grid/cells/Cell";
import { CellNeighbors } from "../../../../types/Grid/cells/CellNeighbors";
import { CellSlopes } from "../../../../types/Grid/cells/CellSlopes";
import { DIRECTIONS } from "../../../../types/Grid/Direction";
import { getEqualCellsArea } from "../../_helpers/getEqualCellsArea";

export function isCellFlowing(
  {
    slopesCells,
    cells,
  }: {
    slopesCells?: Index<Cell & CellNeighbors & CellSlopes>;
    cells?: Index<Cell>;
  },
  id: Ref<Cell>
) {
  if (!slopesCells) slopesCells = getCellsSlopes(getCellsNeighbors(cells!));
  const { water, dams, slopes } = slopesCells[id];
  return (
    water &&
    DIRECTIONS.filter((direction) => {
      if (slopes[direction] === "block") return false;
      if (typeof slopes[direction] === "number")
        return water > (dams[direction] || 0);
      const area = getEqualCellsArea({ slopesCells }, id);
      return (
        area &&
        (area
          .map((id) => slopesCells[id].water)
          .some((_water) => _water < water) ||
          area
            .map((id) => slopesCells[id])
            .some(({ slopes, dams, water }) =>
              Object.keys(slopes).some(
                (direction) =>
                  typeof slopes[direction] === "number" &&
                  water > (dams[direction] || 0)
              )
            ))
      );
    }).length > 0
  );
}
