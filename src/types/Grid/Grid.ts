import { Index } from "../_utilities/Index";
import { Cell } from "./Cell";

export type Grid = {
  /** `Index`'s key ex : `x1y-2z0` */
  cells: Index<Cell>;
};
