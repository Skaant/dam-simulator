import _ from "lodash";
import { Index } from "../../types/_utilities/Index";
import { Ref } from "../../types/_utilities/Ref";
import { Cell } from "../../types/Grid/cells/Cell";
import { Direction } from "../../types/Grid/Direction";
import { CalculatedCell } from "../../components/Grid/types/CalculatedCell";
import { CellNeighbors } from "../../types/Grid/cells/CellNeighbors";
import { CellSlopes } from "../../types/Grid/cells/CellSlopes";

export function getCellSlopes(
  cell: Cell & CellNeighbors,
  cells: Index<Cell>
): Cell & CellSlopes {
  const slopes = (
    Object.entries(cell.neighbors) as [Direction, Ref<Cell>][]
  ).reduce((acc, [direction, id]) => {
    if (cells[id]) {
      const { z } = cells[id];
      if (cell.z > z) acc[direction] = cell.z - z;
      if (cell.z === z) acc[direction] = "equal";
      if (cell.z < z) acc[direction] = "block";
    }
    return acc;
  }, {} as CalculatedCell["slopes"]);

  if (
    Object.values(slopes).every(
      (value) => value === "equal" || value === "block"
    )
  ) {
    if (!slopes["-x"]) slopes["-x"] = 1;
    if (!slopes["x"]) slopes["x"] = 1;
    if (!slopes["-y"]) slopes["-y"] = 1;
    if (!slopes["y"]) slopes["y"] = 1;
  }

  const totalSlope = _.sum(
    Object.values(slopes).filter((slope) => typeof slope === "number")
  );
  Object.entries(slopes).forEach(([direction, value]) => {
    if (typeof value === "number") slopes[direction] = value / totalSlope;
  });

  return { ...cell, slopes };
}
