import React from "react";
import { CELL_SIZE } from "../../../data/grid";
import { Cell } from "../../../types/Grid/cells/Cell";

export default function BottomOutSlope({
  x,
  y,
  value,
}: Pick<Cell, "x" | "y"> & { value: number }) {
  const SIZE = CELL_SIZE;
  const SIZE_1_2 = CELL_SIZE * 0.5;
  const SIZE_1_4 = CELL_SIZE * 0.25;
  const SIZE_1_8 = CELL_SIZE * 0.125;
  return (
    <>
      <polygon
        points={`${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8} ${x}, ${
          y + SIZE
        } ${x + SIZE_1_2}, ${y + SIZE + SIZE_1_8} ${x + SIZE}, ${y + SIZE} ${
          x + SIZE_1_2
        }, ${y + SIZE_1_4 + SIZE_1_8}`}
        fill="#030"
      />
      <text
        x={x + SIZE_1_2}
        y={y + SIZE_1_2 + SIZE_1_4 + SIZE_1_8}
        fontSize={SIZE * 0.09375}
        textAnchor="middle"
        fill="#fff8"
      >
        ⬇{Math.round(value * 100)}%
      </text>
    </>
  );
}
