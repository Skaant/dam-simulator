import { Cell } from "../../../types/Grid/cells/Cell";
import { CellNeighbors } from "../../../types/Grid/cells/CellNeighbors";
import { CellSlopes } from "../../../types/Grid/cells/CellSlopes";

export type CalculatedCell = Cell & CellNeighbors & CellSlopes;
