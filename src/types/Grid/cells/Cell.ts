import { Id } from "../../_utilities/Id";
import { SoilLayer } from "../../SoilLayer/SoilLayer";
import { DirectionIndex } from "../DirectionIndex";

export type Cell = Id & {
  /** Left-to-right axis */
  x: number;
  /** Bottom-to-top axis */
  y: number;
  /** Altitude */
  z: number;
  water: number;
  dams: DirectionIndex<number>;
  soilLayers: SoilLayer[];
};
