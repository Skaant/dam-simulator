import { useAtom } from "jotai/react";
import React, { useMemo } from "react";
import { cellsAtom } from "../../atoms/cells.atom";
import { getRangeFromCells } from "./helpers/getRangeFromCells";
import { Cell } from "../Cell/Cell";
import { getCellsNeighbors } from "../../helpers/cells/getCellsNeighbors";
import { getCellsSlopes } from "../../helpers/cells/getCellsSlopes";

export default function Grid() {
  const [cells] = useAtom(cellsAtom);
  const _cells = useMemo(
    () => Object.values(getCellsSlopes(getCellsNeighbors(cells))),
    [cells]
  );
  const [xMin, xMax, yMin, yMax] = useMemo(
    () => getRangeFromCells(Object.values(cells)),
    [_cells]
  );
  const [width, height] = useMemo(
    () => [((xMax - xMin) * 2 + 2.5) * 64, ((yMax - yMin) * 2 + 2.5) * 64 + 16],
    [xMin, xMax, yMin, yMax]
  );
  return (
    <div id="grid-container">
      <svg width={width} height={height}>
        {_cells.map((cell) => (
          <Cell cell={cell} grid={{ xMin, yMin, yMax }} />
        ))}
      </svg>
    </div>
  );
}
