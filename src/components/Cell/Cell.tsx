import React from "react";
import CellWater from "./CellWater";
import CellSlopes from "./CellSlopes";
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
        x={((cell.x - xMin) * 1.5 + 1) * 64}
        y={
          ((Math.abs(yMin) + yMax - cell.y + yMin) * 1.5 + 1) * 64 - cell.z * 16
        }
        width={64}
        height={64}
        fill="green"
      />
      {cell.soilLayers
        .filter((_, index) => cell.z - index > 0)
        .map((_, index) => (
          <rect
            x={((cell.x - xMin) * 1.5 + 1) * 64}
            y={
              ((Math.abs(yMin) + yMax - cell.y + yMin) * 1.5 + 2) * 64 -
              (cell.z - index) * 16
            }
            width={64}
            height={16}
            fill="grey"
          />
        ))}
      <CellSlopes
        cell={{
          slopes: cell.slopes,
        }}
        grid={{
          x: ((cell.x - xMin) * 1.5 + 1) * 64,
          y:
            ((Math.abs(yMin) + yMax - cell.y + yMin) * 1.5 + 1) * 64 -
            cell.z * 16,
        }}
      />
      <CellWater
        cell={{
          slopes: cell.slopes,
          water: cell.water,
        }}
        grid={{
          x: ((cell.x - xMin) * 1.5 + 1) * 64,
          y:
            ((Math.abs(yMin) + yMax - cell.y + yMin) * 1.5 + 1) * 64 -
            cell.z * 16,
        }}
      />
    </>
  );
}
