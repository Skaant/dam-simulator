import React from "react";
import { Cell } from "../../../types/Grid/cells/Cell";
import { CELL_SIZE } from "../../../data/grid";

export default function BottomOutWater({
  x,
  y,
  value,
}: Pick<Cell, "x" | "y"> & { value: number }) {
  const SIZE = CELL_SIZE;
  const SIZE_1_2 = CELL_SIZE * 0.5;
  const SIZE_1_4 = CELL_SIZE * 0.25;
  const SIZE_1_8 = CELL_SIZE * 0.125;
  return (
    <polygon
      points={`${x + SIZE_1_2 - value * 3.75}, ${y + SIZE_1_4 + SIZE_1_8} ${
        x + SIZE_1_2 - value * 3.75
      }, ${y + SIZE} ${x + SIZE_1_2 + value * 3.75}, ${y + SIZE} ${
        x + SIZE_1_2 + value * 3.75
      }, ${y + SIZE_1_4 + SIZE_1_8} ${x + SIZE_1_2 - value * 3.75}, ${
        y + SIZE_1_4 + SIZE_1_8
      }`}
      fill="#a3d3f3"
    />
  );
}
