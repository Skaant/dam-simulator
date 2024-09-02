import { Id } from "../_utilities/Id";
import { SoilLayer } from "../SoilLayer/SoilLayer";

export type Cell = Id & {
  /** left-to-right axis */
  x: number;
  /** bottom-to-top axis */
  y: number;
  /** @alias Altitude */
  z: number;
  soilLayers: SoilLayer[];
};
