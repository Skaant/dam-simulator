import React from "react";
import { getHex } from "../../helpers/getHex";
import { CELL_SIZE } from "../../data/grid";
import { CellSlopes } from "../../types/Grid/cells/CellSlopes";
import TopOutSlope from "./slopes/TopOutSlope";
import BottomOutSlope from "./slopes/BottomOutSlope";
import BottomInSlope from "./slopes/BottomInSlope";
import TopInSlope from "./slopes/TopInSlope";
import LeftInSlope from "./slopes/LeftInSlope";
import LeftOutSlope from "./slopes/LeftOutSlope";
import RightOutSlope from "./slopes/RightOutSlope";
import RightInSlope from "./slopes/RightInSlope";

export default function CellSlopes({
  cell: { slopes },
  grid: { x, y },
}: {
  cell: Pick<CellSlopes, "slopes">;
  grid: { x: number; y: number };
}) {
  const SIZE = CELL_SIZE;
  const SIZE_1_2 = CELL_SIZE * 0.5;
  const SIZE_1_4 = CELL_SIZE * 0.25;
  const SIZE_1_8 = CELL_SIZE * 0.125;
  return Object.entries(slopes).map(([direction, value]) =>
    direction === "-x" ? (
      typeof value === "number" ? (
        <LeftOutSlope x={x} y={y} value={value} />
      ) : value === "block" ? (
        <LeftInSlope x={x} y={y} />
      ) : (
        <polygon
          points={`${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8} ${x}, ${
            y + SIZE
          } ${x}, ${y} ${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8}`}
          fill="#084"
        />
      )
    ) : direction === "x" ? (
      typeof value === "number" ? (
        <RightOutSlope x={x} y={y} value={value} />
      ) : value === "block" ? (
        <RightInSlope x={x} y={y} />
      ) : (
        <polygon
          points={`${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8} ${
            x + SIZE
          }, ${y} ${x + SIZE}, ${y + SIZE} ${x + SIZE_1_2}, ${
            y + SIZE_1_4 + SIZE_1_8
          }`}
          fill="#084"
        />
      )
    ) : direction === "-y" ? (
      typeof value === "number" ? (
        <BottomOutSlope x={x} y={y} value={value} />
      ) : value === "block" ? (
        <BottomInSlope x={x} y={y} />
      ) : (
        <polygon
          points={`${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8} ${x}, ${
            y + SIZE
          } ${x + SIZE}, ${y + SIZE} ${x + SIZE_1_2}, ${
            y + SIZE_1_4 + SIZE_1_8
          }`}
          fill="#084"
        />
      )
    ) : // direction y
    typeof value === "number" ? (
      <TopOutSlope x={x} y={y} value={value} />
    ) : value === "block" ? (
      <TopInSlope x={x} y={y} />
    ) : (
      <polygon
        points={`${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8} ${x}, ${y} ${
          x + SIZE
        }, ${y} ${x + SIZE_1_2}, ${y + SIZE_1_4 + SIZE_1_8}`}
        fill="#084"
      />
    )
  );
}
