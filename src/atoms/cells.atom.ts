import { atom } from "jotai";
import { Index } from "../types/_utilities/Index";
import { Cell } from "../types/Grid/Cell";

export const cellsAtom = atom<Index<Cell>>({
  x0y0: {
    id: "x0y0",
    x: 0,
    y: 0,
    z: 3,
    soilLayers: [{}, {}, {}, {}, {}],
  },
  x1y0: {
    id: "x1y0",
    x: 1,
    y: 0,
    z: 0,
    soilLayers: [{}, {}, {}],
  },
  "x1y-1": {
    id: "x1y-1",
    x: 1,
    y: -1,
    z: 0,
    soilLayers: [{}],
  },
  x0y1: {
    id: "x0y1",
    x: 0,
    y: 1,
    z: 1,
    soilLayers: [{}, {}],
  },
  x0y3: {
    id: "x0y3",
    x: 0,
    y: 3,
    z: 1,
    soilLayers: [{}, {}, {}, {}, {}, {}, {}],
  },
  x2y2: {
    id: "x2y2",
    x: 2,
    y: 2,
    z: 0,
    soilLayers: [{}],
  },
  "x-1y3": {
    id: "x-1y3",
    x: -1,
    y: 3,
    z: 2,
    soilLayers: [{}, {}, {}],
  },
});
