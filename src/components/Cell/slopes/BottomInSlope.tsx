import React from "react";
import { CELL_SIZE } from "../../../data/grid";
import { Cell } from "../../../types/Grid/cells/Cell";

export default function BottomInSlope({ x, y }: Pick<Cell, "x" | "y">) {
  const SIZE = CELL_SIZE;
  const SIZE_1_2 = CELL_SIZE * 0.5;
  const SIZE_1_4 = CELL_SIZE * 0.25;
  const SIZE_1_8 = CELL_SIZE * 0.125;
  return (
    <polygon
      points={`${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8} ${x}, ${
        y + SIZE
      } ${x}, ${y + SIZE + SIZE_1_8} ${x + SIZE_1_2}, ${y + SIZE} ${
        x + SIZE
      }, ${y + SIZE + SIZE_1_8} ${x + SIZE}, ${y + SIZE} ${x + SIZE_1_2}, ${
        y + SIZE_1_4 + SIZE_1_8
      }`}
      fill="#6b6"
    />
  );
}
