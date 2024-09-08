import { useAtom } from "jotai/react";
import React, { useMemo } from "react";
import { cellsAtom } from "../../atoms/cells.atom";
import { getRangeFromCells } from "./helpers/getRangeFromCells";
import { Cell } from "../Cell/Cell";
import { getCellsNeighbors } from "../../helpers/cells/getCellsNeighbors";
import { getCellsSlopes } from "../../helpers/cells/getCellsSlopes";
import { CELL_SIZE } from "../../data/grid";

export default function Grid() {
  const [cells] = useAtom(cellsAtom);
  const _cells = useMemo(
    () =>
      Object.values(getCellsSlopes(getCellsNeighbors(cells))).sort(
        (a, b) => b.y - a.y
      ),
    [cells]
  );
  const [xMin, xMax, yMin, yMax] = useMemo(
    () => getRangeFromCells(Object.values(cells)),
    [_cells]
  );
  const [width, height] = useMemo(
    () => [
      (xMax - xMin + 1) * CELL_SIZE,
      ((yMax - yMin) * 1.5 + 2) * CELL_SIZE + CELL_SIZE / 8,
    ],
    [xMin, xMax, yMin, yMax]
  );
  return (
    <div id="grid-container">
      <svg width={width} height={height}>
        {_cells.map((cell) => (
          <Cell key={cell.id} cell={cell} grid={{ xMin, yMin, yMax }} />
        ))}
      </svg>
    </div>
  );
}
