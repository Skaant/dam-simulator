import { getCellsNeighbors } from "../../../helpers/cells/getCellsNeighbors";
import { getCellsSlopes } from "../../../helpers/cells/getCellsSlopes";
import { Index } from "../../../types/_utilities/Index";
import { Ref } from "../../../types/_utilities/Ref";
import { Cell } from "../../../types/Grid/cells/Cell";
import { CellNeighbors } from "../../../types/Grid/cells/CellNeighbors";
import { CellSlopes } from "../../../types/Grid/cells/CellSlopes";
import { Direction } from "../../../types/Grid/Direction";

export function getEqualCellsArea(
  {
    slopesCells,
    cells,
  }: {
    slopesCells?: Index<Cell & CellNeighbors & CellSlopes>;
    cells?: Index<Cell>;
  },
  id: Ref<Cell>,
  area: Ref<Cell>[] = []
): Ref<Cell>[] | false {
  if (!slopesCells) slopesCells = getCellsSlopes(getCellsNeighbors(cells!));
  const equalSlopes = Object.entries(slopesCells[id].slopes).filter(
    ([_, slope]) => slope === "equal"
  );
  const equalNeighbors = equalSlopes
    .map(([direction]) => slopesCells[id].neighbors[direction as Direction]!)
    .filter((_id) => !area.includes(_id));
  if (equalNeighbors.length) {
    let _area = [id];
    equalNeighbors.forEach((id) =>
      _area.push(
        ...(getEqualCellsArea({ slopesCells }, id, [...area, ..._area]) || [id])
      )
    );
    return _area;
  } else if (equalSlopes.length) return [id];
  return false;
}
