import { Cell } from "../../types/Grid/cells/Cell";

export function cellFactory(cell: Pick<Cell, "x" | "y"> & Partial<Cell>): Cell {
  const z = Math.round(Math.random() * 3);
  return {
    id: `x${cell.x}y${cell.y}`,
    z,
    water: Math.round(Math.random() * 2),
    dams: {},
    soilLayers: [...Array(z)].map(() => ({ water: 0 })),
    ...cell,
  };
}
