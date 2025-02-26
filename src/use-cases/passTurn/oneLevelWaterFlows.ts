import { createStore } from "jotai";
import { getFlowingWaterCells } from "./_helpers/getFlowingWaterCells";
import { cellsAtom } from "../../atoms/cells.atom";
import { Cell } from "../../types/Grid/cells/Cell";
import { Index } from "../../types/_utilities/Index";
import { Direction } from "../../types/Grid/Direction";
import { scoreAtom } from "../../atoms/score.atom";
import { SetAtom } from "../../types/_utilities/SetAtom";
import { Score } from "../../types/Score";
import { getCellsSlopes } from "../../helpers/cells/getCellsSlopes";
import { getCellsNeighbors } from "../../helpers/cells/getCellsNeighbors";
import { getEqualCellsArea } from "./_helpers/getEqualCellsArea";
import _ from "lodash";
import { oneSlopeWaterFlows } from "./_helpers/oneSlopeWaterFlows";

export function oneLevelWaterFlows({
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

    const flowingCells = getFlowingWaterCells({ cells });
    if (!flowingCells.length) resolve(false);

    let timer = 0;
    flowingCells
      .sort((a, b) => b.z - a.z)
      .forEach((cell) => {
        timer += 250;
        setTimeout(() => {
          const { id, neighbors, slopes } = cell;
          const { water } = cells[id];
          const flowingSlopes = Object.entries(slopes).filter(
            ([_, slope]) => typeof slope === "number"
          ) as [Direction, number][];
          cells = {
            ...cells,
            [id]: {
              ...cell,
              water: water - 1,
            },
          };
          let waterLost = 0;
          flowingSlopes.forEach(([direction, slope]) => {
            if (neighbors[direction] && cells[neighbors[direction]]) {
              cells = oneSlopeWaterFlows(cells, neighbors[direction], slope);
            } else {
              waterLost += 1 * slope;
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
      });
    setTimeout(() => resolve({ cells, score }), timer + 250);
  });
}
