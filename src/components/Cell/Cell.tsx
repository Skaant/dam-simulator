import React from "react";
import CellWater from "./CellWater";
import CellSlopes from "./CellSlopes";
import { CalculatedCell } from "../Grid/types/CalculatedCell";
import { CELL_SIZE, SOIL_LAYER_HEIGHT } from "../../data/grid";

export function Cell({
  cell,
  grid: { xMin, yMin, yMax },
}: {
  cell: CalculatedCell;
  grid: { xMin: number; yMin: number; yMax: number };
}) {
  const x = (cell.x - xMin) * CELL_SIZE;
  const y =
    ((Math.abs(yMin) + yMax - cell.y + yMin) * 1.5 + 0.5) * CELL_SIZE -
    cell.z * SOIL_LAYER_HEIGHT;
  return (
    <>
      <rect x={x} y={y} width={CELL_SIZE} height={CELL_SIZE} fill="green" />
      <rect
        x={x}
        y={y + CELL_SIZE}
        width={CELL_SIZE}
        height={
          SOIL_LAYER_HEIGHT *
          cell.soilLayers.filter((_, index) => cell.z - index > 0).length
        }
        fill="grey"
      />
      <CellSlopes
        cell={{
          slopes: cell.slopes,
        }}
        grid={{
          x,
          y,
        }}
      />
      <CellWater
        cell={{
          slopes: cell.slopes,
          water: cell.water,
        }}
        grid={{
          x,
          y,
        }}
      />
    </>
  );
}
