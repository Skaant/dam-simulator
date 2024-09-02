import React, { useMemo } from "react";
import { CalculatedCell } from "../Grid/types/CalculatedCell";
import _ from "lodash";
import { Direction } from "../../types/Grid/Direction";
import { getHex } from "../../helpers/getHex";

export default function CellWater({
  cell: { x, y, slopes, soilLayers },
}: {
  cell: Pick<CalculatedCell, "x" | "y" | "slopes" | "soilLayers">;
}) {
  const totalSlopes = useMemo(
    () =>
      _.sum(Object.values(slopes).filter((slope) => typeof slope === "number")),
    [slopes]
  );
  const topLayer = useMemo(() => soilLayers[0], [soilLayers]);
  const waterRadius = useMemo(
    () => ((topLayer.water || 0) / 2) * Math.PI,
    [topLayer.water]
  );
  return (
    <>
      {topLayer.water}
      {waterRadius}
      {waterRadius && (
        <circle cx={x + 32} cy={y + 32} r={waterRadius} fill={`#88ff`} />
      )}
      {(
        Object.entries(slopes) as [Direction, number | "equal" | "block"][]
      ).map(([direction, value]) => {
        const percent =
          value === "equal"
            ? undefined
            : value === "block"
            ? 0
            : Math.round((value / totalSlopes) * 16) - 1;
        if (direction === "-x")
          return (
            <polygon
              points={`${x + 10}, ${y + 32} ${x + 16}, ${y + 28} ${x + 16}, ${
                y + 36
              } ${x + 10}, ${y + 32}`}
              fill={
                percent === undefined ? "red" : `#bbf${percent.toString(16)}`
              }
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
              fill={
                percent === undefined ? "red" : `#bbf${percent.toString(16)}`
              }
            />
          );
        if (direction === "y")
          return (
            <polygon
              points={`${x + 32}, ${y + 10} ${x + 28}, ${y + 16} ${x + 36}, ${
                y + 16
              } ${x + 32}, ${y + 10}`}
              fill={
                percent === undefined ? "red" : `#bbf${percent.toString(16)}`
              }
            />
          );
      })}
    </>
  );
}
