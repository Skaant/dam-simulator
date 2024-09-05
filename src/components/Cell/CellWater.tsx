import React, { useMemo } from "react";
import { CalculatedCell } from "../Grid/types/CalculatedCell";
import _ from "lodash";
import { Direction } from "../../types/Grid/Direction";
import { getHex } from "../../helpers/getHex";

export default function CellWater({
  cell: { slopes, water },
  grid: { x, y },
}: {
  cell: Pick<CalculatedCell, "slopes" | "water">;
  grid: { x: number; y: number };
}) {
  return (
    <>
      {water > 0 && (
        <>
          <rect
            x={x + 16}
            y={y + 16 - water * 4}
            width={32}
            height={32}
            fill="#88ff"
          />
          <rect
            x={x + 16}
            y={y + 48 - water * 4}
            width={32}
            height={water * 4}
            fill="#44ff"
          />
        </>
      )}
      {(
        Object.entries(slopes) as [Direction, number | "equal" | "block"][]
      ).map(([direction, value]) => {
        const percent =
          value === "equal"
            ? undefined
            : value === "block"
            ? 0
            : Math.round(value * 16) - 1;
        if (direction === "-x")
          return (
            <polygon
              points={`${x + 10}, ${y + 32} ${x + 16}, ${y + 28} ${x + 16}, ${
                y + 36
              } ${x + 10}, ${y + 32}`}
              fill={percent === undefined ? "red" : `#bbf${getHex(percent)}`}
            />
          );
        if (direction === "x")
          return (
            <polygon
              points={`${x + 54}, ${y + 32} ${x + 48}, ${y + 28} ${x + 48}, ${
                y + 36
              } ${x + 54}, ${y + 32}`}
              fill={percent === undefined ? "red" : `#bbf${getHex(percent)}`}
            />
          );
        if (direction === "-y")
          return (
            <polygon
              points={`${x + 32}, ${y + 54} ${x + 28}, ${y + 48} ${x + 36}, ${
                y + 48
              } ${x + 32}, ${y + 54}`}
              fill={percent === undefined ? "red" : `#bbf${getHex(percent)}`}
            />
          );
        if (direction === "y")
          return (
            <polygon
              points={`${x + 32}, ${y + 10} ${x + 28}, ${y + 16} ${x + 36}, ${
                y + 16
              } ${x + 32}, ${y + 10}`}
              fill={percent === undefined ? "red" : `#bbf${getHex(percent)}`}
            />
          );
      })}
    </>
  );
}
