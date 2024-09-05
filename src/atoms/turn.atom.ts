import { atom } from "jotai";
import { Turn } from "../types/Turn";

export const turnAtom = atom<Turn>({
  count: 0,
  rain: 0,
  forecast: 1,
});
