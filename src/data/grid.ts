import { createCells } from "../helpers/cells/createCells";

export const GRID = createCells(5, 5);

export const CELL_SIZE = 128;
export const SOIL_LAYER_HEIGHT = CELL_SIZE / 8;
export const WATER_LEVEL_HEIGHT = CELL_SIZE / 16;
