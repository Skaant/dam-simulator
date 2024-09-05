import { atom } from "jotai";
import { Index } from "../types/_utilities/Index";
import { Cell } from "../types/Grid/cells/Cell";
import { createCells } from "../helpers/cells/createCells";
import { GRID } from "../data/grid";

export const cellsAtom = atom<Index<Cell>>(GRID);
