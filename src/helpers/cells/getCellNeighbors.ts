import { Index } from "../../types/_utilities/Index";
import { Ref } from "../../types/_utilities/Ref";
import { Cell } from "../../types/Grid/cells/Cell";
import { Direction } from "../../types/Grid/Direction";
import { DirectionIndex } from "../../types/Grid/DirectionIndex";
import { getCellNeighborsId } from "./getCellNeighborsId";

export function getCellNeighbors(cell: Cell, cells: Index<Cell>) {
  return getCellNeighborsId(cell.x, cell.y)
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
    }, {} as DirectionIndex<Ref<Cell>>);
}
