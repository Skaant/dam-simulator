import React from "react";
import { Cell } from "../../types/Grid/Cell";
import CellWater from "./CellWater";
import { CalculatedCell } from "../Grid/types/CalculatedCell";

export function Cell({
  cell,
  grid: { xMin, yMin, yMax },
}: {
  cell: CalculatedCell;
  grid: { xMin: number; yMin: number; yMax: number };
}) {
  return (
    <>
      <rect
        x={((cell.x - xMin) * 2 + 1) * 64}
        y={((Math.abs(yMin) + yMax - cell.y + yMin) * 2 + 1) * 64 - cell.z * 16}
        width={64}
        height={64}
        fill="green"
      />
      {cell.soilLayers.map((_, index) => (
        <rect
          x={((cell.x - xMin) * 2 + 1) * 64}
          y={
            ((Math.abs(yMin) + yMax - cell.y + yMin) * 2 + 2) * 64 -
            (cell.z - index) * 16
          }
          width={64}
          height={16}
          fill={cell.z - index > 0 ? "grey" : "sand"}
        />
      ))}
      <CellWater
        cell={{
          x: ((cell.x - xMin) * 2 + 1) * 64,
          y:
            ((Math.abs(yMin) + yMax - cell.y + yMin) * 2 + 1) * 64 -
            cell.z * 16,
          slopes: cell.slopes,
          soilLayers: cell.soilLayers,
        }}
      />
    </>
  );
}
