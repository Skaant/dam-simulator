import { Ref } from "../../../types/_utilities/Ref";
import { Cell } from "../../../types/Grid/Cell";
import { Direction } from "../../../types/Grid/Direction";

export type CalculatedCell = Cell & {
  neighbors: {
    [key in Direction]: Ref<Cell>;
  };
  slopes: {
    [key in Direction]?: number | "equal" | "block";
  };
};
