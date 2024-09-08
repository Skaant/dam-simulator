import React from "react";
import { CELL_SIZE } from "../../../data/grid";
import { Cell } from "../../../types/Grid/cells/Cell";

export default function RightInSlope({ x, y }: Pick<Cell, "x" | "y">) {
  const SIZE = CELL_SIZE;
  const SIZE_1_2 = CELL_SIZE * 0.5;
  const SIZE_1_4 = CELL_SIZE * 0.25;
  const SIZE_1_8 = CELL_SIZE * 0.125;
  return (
    <>
      <polygon
        points={`${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8} ${x + SIZE}, ${
          y + SIZE_1_4
        } ${x + SIZE}, ${y} ${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8}`}
        fill="#4a4"
      />
      <polygon
        points={`${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8} ${x + SIZE}, ${
          y + SIZE_1_4
        } ${x + SIZE}, ${y + SIZE} ${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8}`}
        fill="#050"
      />
    </>
  );
}
