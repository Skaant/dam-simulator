import { getFlowingWaterCells } from "./getFlowingWaterCells/getFlowingWaterCells";
import { Cell } from "../../../types/Grid/cells/Cell";
import { Index } from "../../../types/_utilities/Index";
import { Direction } from "../../../types/Grid/Direction";
import { SetAtom } from "../../../types/_utilities/SetAtom";
import { Score } from "../../../types/Score";
import _ from "lodash";
import { oneSlopeWaterFlows } from "./oneSlopeWaterFlows";
import { getCellsSlopes } from "../../../helpers/cells/getCellsSlopes";
import { getCellNeighbors } from "../../../helpers/cells/getCellNeighbors";
import { getCellsNeighbors } from "../../../helpers/cells/getCellsNeighbors";
import { CellNeighbors } from "../../../types/Grid/cells/CellNeighbors";
import { CellSlopes } from "../../../types/Grid/cells/CellSlopes";
import { getFirstFlowingCell } from "./getFirstFlowingCell/getFirstFlowingCell";
import { Ref } from "../../../types/_utilities/Ref";

export function waterFlows({
  cells: _cells,
  setCells,
  score: _score,
  setScore,
}: {
  cells: Index<Cell>;
  setCells: SetAtom<Index<Cell>>;
  score: Score;
  setScore: SetAtom<Score>;
}): Promise<
  | false
  | {
      cells: Index<Cell>;
      score: Score;
    }
> {
  return new Promise((resolve) => {
    let cells = { ..._cells };
    let score = { ..._score };

    let slopesCells = getCellsSlopes(getCellsNeighbors(cells));
    let flowingCell = getFirstFlowingCell(slopesCells);
    let iteratedCells: Ref<Cell>[] = [];
    let timer = 0;

    while (flowingCell) {
      // Loop
      iteratedCells.push(flowingCell.id);
      timer += 250;
      // Water out
      const waterFlowing = Math.min(flowingCell.water, 1);
      cells[flowingCell.id].water -= waterFlowing;
      // Water in
      let waterLost = 0;

      // Loop
      slopesCells = getCellsSlopes(getCellsNeighbors(cells));
      flowingCell = getFirstFlowingCell(slopesCells, iteratedCells);
    }

    setTimeout(() => resolve({ cells, score }), timer + 250);

    /* const flowingCells = getFlowingWaterCells(cells);
    if (!flowingCells.length) resolve(false);

    flowingCells
      .forEach((cell) => {
        timer += 250;
        setTimeout(() => {
          const { id, neighbors, slopes } = cell;
          const { water } = cells[id];
          const flowingSlopes = Object.entries(slopes).filter(
            ([_, slope]) => typeof slope === "number"
          ) as [Direction, number][];
          let waterLost = 0;
          flowingSlopes.forEach(([direction, slope]) => {
            if (neighbors[direction] && cells[neighbors[direction]]) {
              cells = oneSlopeWaterFlows(
                cells,
                neighbors[direction],
                Math.min(water, 1),
                slope
              );
            } else {
              waterLost += Math.min(water, 1) * slope;
            }
          });
          setCells(() => cells);
          if (waterLost) {
            score = {
              ...score,
              waterLost: score.waterLost + waterLost,
            };
            setScore(() => score);
          }
        }, timer);
      }); */
  });
}
