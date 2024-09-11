import { getCellsNeighbors } from "../../../helpers/cells/getCellsNeighbors";
import { getCellsSlopes } from "../../../helpers/cells/getCellsSlopes";
import { Index } from "../../../types/_utilities/Index";
import { Ref } from "../../../types/_utilities/Ref";
import { Cell } from "../../../types/Grid/cells/Cell";
import { getEqualCellsArea } from "../_helpers/getEqualCellsArea";

export function oneSlopeWaterFlows(
  cells: Index<Cell>,
  id: Ref<Cell>,
  /** 0 < flowingWater <= 1 */
  flowingWater: number,
  slope: number
) {
  const _cells = { ...cells };
  const area = getEqualCellsArea(_cells, _cells[id]);
  if (area && area.length) {
    const _water = (flowingWater * slope) / area.length;
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
      water: _cells[id].water + flowingWater * slope,
    };
  return _cells;
}
