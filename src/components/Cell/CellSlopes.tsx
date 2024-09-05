import React from "react";
import { CalculatedCell } from "../Grid/types/CalculatedCell";
import { getHex } from "../../helpers/getHex";

export default function CellSlopes({
  cell: { slopes },
  grid: { x, y },
}: {
  cell: Pick<CalculatedCell, "slopes">;
  grid: { x: number; y: number };
}) {
  return Object.entries(slopes)
    .filter(([_, value]) => typeof value === "number")
    .map(([direction, value]) =>
      direction === "-x" ? (
        <polygon
          points={`${x + 32}, ${y + 32} ${x + 0}, ${y + 64} ${x + 0}, ${y} ${
            x + 32
          }, ${y + 32}`}
          fill={`#000${getHex(Math.round(2 * (value as number) * 4))}`}
        />
      ) : direction === "x" ? (
        <polygon
          points={`${x + 32}, ${y + 32} ${x + 64}, ${y} ${x + 64}, ${y + 64} ${
            x + 32
          }, ${y + 32}`}
          fill={`#000${getHex(Math.round(2 * (value as number) * 4))}`}
        />
      ) : direction === "-y" ? (
        <polygon
          points={`${x + 32}, ${y + 32} ${x + 0}, ${y + 64} ${x + 64}, ${
            y + 64
          } ${x + 32}, ${y + 32}`}
          fill={`#000${getHex(Math.round(2 * (value as number) * 4))}`}
        />
      ) : (
        <polygon
          points={`${x + 32}, ${y + 32} ${x + 0}, ${y} ${x + 64}, ${y} ${
            x + 32
          }, ${y + 32}`}
          fill={`#000${getHex(Math.round(2 * (value as number) * 4))}`}
        />
      )
    );
}
