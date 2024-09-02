import { useAtom } from "jotai/react";
import React, { useMemo } from "react";
import { cellsAtom } from "../../atoms/cells.atom";
import { getRangeFromCells } from "./helpers/getRangeFromCells";
import { Cell } from "../Cell/Cell";
import { getCalculatedCells } from "./helpers/getCalculatedCells";

export default function Grid() {
  const [cells] = useAtom(cellsAtom);
  const _cells = useMemo(() => getCalculatedCells(cells), [cells]);
  const [xMin, xMax, yMin, yMax] = useMemo(
    () => getRangeFromCells(_cells),
    [_cells]
  );
  const [width, height] = useMemo(
    () => [((xMax - xMin) * 2 + 3) * 64, ((yMax - yMin) * 2 + 3) * 64 + 16],
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
