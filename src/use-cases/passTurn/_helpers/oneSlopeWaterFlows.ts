import { getCellsNeighbors } from "../../../helpers/cells/getCellsNeighbors";
import { getCellsSlopes } from "../../../helpers/cells/getCellsSlopes";
import { Index } from "../../../types/_utilities/Index";
import { Ref } from "../../../types/_utilities/Ref";
import { Cell } from "../../../types/Grid/cells/Cell";
import { getEqualCellsArea } from "./getEqualCellsArea";

export function oneSlopeWaterFlows(
  cells: Index<Cell>,
  id: Ref<Cell>,
  slope: number
) {
  const _cells = { ...cells };
  const area = getEqualCellsArea(
    getCellsSlopes(getCellsNeighbors(_cells)),
    _cells[id]
  );
  if (area && area.length) {
    const _water = (1 * slope) / area.length;
    area.forEach(
      (_id) =>
        (_cells[_id] = {
          ..._cells[_id],
          water: _cells[_id].water + _water,
        })
    );
  } else
    _cells[id] = {
      ..._cells[id],
      water: _cells[id].water + 1 * slope,
    };
  return _cells;
}
