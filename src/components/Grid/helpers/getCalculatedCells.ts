import { Index } from "../../../types/_utilities/Index";
import { Ref } from "../../../types/_utilities/Ref";
import { Cell } from "../../../types/Grid/Cell";
import { Direction } from "../../../types/Grid/Direction";
import { CalculatedCell } from "../types/CalculatedCell";
import { getNeighborsId } from "./getNeighborsId";

export function getCalculatedCells(cells: Index<Cell>): CalculatedCell[] {
  return Object.values(cells).map((cell) => {
    const neighbors = getNeighborsId(cell.x, cell.y)
      .map((id, index) => ({
        ...(cells[id] || {}),
        direction:
          index < 2
            ? index === 0
              ? "-x"
              : "x"
            : index === 2
            ? "-y"
            : ("y" as Direction),
      }))
      .reduce((acc, { direction, ...cell }) => {
        acc[direction] = cell.id;
        return acc;
      }, {} as CalculatedCell["neighbors"]);
    const slopes = (
      Object.entries(neighbors) as [Direction, Ref<Cell>][]
    ).reduce((acc, [direction, id]) => {
      if (cells[id]) {
        const { z } = cells[id];
        if (cell.z > z) acc[direction] = cell.z - z;
        if (cell.z === z) acc[direction] = "equal";
        if (cell.z < z) acc[direction] = "block";
      }
      if (
        direction === "y" &&
        Object.values(acc).every(
          (value) => value === "equal" || value === "block"
        )
      ) {
        if (!acc["-x"]) acc["-x"] = 1;
        if (!acc["x"]) acc["x"] = 1;
        if (!acc["-y"]) acc["-y"] = 1;
        if (!acc["y"]) acc["y"] = 1;
      }
      return acc;
    }, {} as CalculatedCell["slopes"]);
    return {
      ...cell,
      neighbors,
      slopes,
    };
  });
}
