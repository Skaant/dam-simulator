import { Ref } from "../../_utilities/Ref";
import { DirectionIndex } from "../DirectionIndex";
import { Cell } from "./Cell";

export type CellNeighbors = { neighbors: DirectionIndex<Ref<Cell>> };
