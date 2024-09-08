import React from "react";
import { Cell } from "../../../types/Grid/cells/Cell";
import { CELL_SIZE } from "../../../data/grid";

export default function DropletSVG({
  x,
  y,
  water,
}: Pick<Cell, "x" | "y" | "water">) {
  const SIZE_1_2 = CELL_SIZE / 2;
  const SIZE_1_4 = CELL_SIZE / 4;
  const SIZE_1_8 = CELL_SIZE / 8;
  const SIZE_1_16 = CELL_SIZE / 16;
  return (
    <svg
      x={x + SIZE_1_16 - water * 2}
      y={y + SIZE_1_16 - water * 2}
      width={SIZE_1_4 + SIZE_1_8 + water * 4}
      height={SIZE_1_4 + SIZE_1_8 + water * 4}
      viewBox="0 0 8.4667 8.4667"
    >
      <path
        d="m4.1341 0.69453s0 1.0914-0.64492 1.9844c-0.64492 0.89297-2.2655 1.6536-2.3316 2.9931-0.066146 1.3395 1.2072 2.2324 2.8277 2.1828s3.0262-0.8599 2.9931-2.2986c-0.033073-1.4387-1.6371-1.9513-2.1167-2.7781s-0.7276-2.0836-0.7276-2.0836z"
        fill="#a3d3f3"
      />
    </svg>
  );
}
