import { Index } from "../../../../types/_utilities/Index";
import { Ref } from "../../../../types/_utilities/Ref";
import { Cell } from "../../../../types/Grid/cells/Cell";
import { CellNeighbors } from "../../../../types/Grid/cells/CellNeighbors";
import { CellSlopes } from "../../../../types/Grid/cells/CellSlopes";
import { isCellFlowing } from "../isCellFlowing/isCellFlowing";

export function getFirstFlowingCell(
  slopesCells: Index<Cell & CellNeighbors & CellSlopes>,
  exclude: Ref<Cell>[] = []
) {
  return Object.values(slopesCells)
    .filter(
      ({ id }) => !exclude.includes(id) && isCellFlowing({ slopesCells }, id)
    )
    .sort((a, b) => b.z - a.z)[0] as
    | (Cell & CellNeighbors & CellSlopes)
    | undefined;
}
