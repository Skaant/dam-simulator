import { getCellsNeighbors } from "../../../helpers/cells/getCellsNeighbors";
import { getCellsSlopes } from "../../../helpers/cells/getCellsSlopes";
import { Index } from "../../../types/_utilities/Index";
import { Ref } from "../../../types/_utilities/Ref";
import { Cell } from "../../../types/Grid/cells/Cell";
import { Direction } from "../../../types/Grid/Direction";

export function getEqualCellsArea(
  cells: Index<Cell>,
  cell: Cell,
  area: Ref<Cell>[] = []
): Ref<Cell>[] | false {
  const slopesCells = getCellsSlopes(getCellsNeighbors(cells));
  const equalNeighbors = Object.entries(slopesCells[cell.id].slopes)
    .filter(([_, slope]) => slope === "equal")
    .map(
      ([direction]) => slopesCells[cell.id].neighbors[direction as Direction]!
    )
    .filter((id) => !area.includes(id));
  if (equalNeighbors.length) {
    let _area = [...area, cell.id];
    equalNeighbors.forEach((id) => {
      _area.push(...(getEqualCellsArea(cells, cells[id], _area) || [id]));
    });
    return _area;
  } else return false;
}
