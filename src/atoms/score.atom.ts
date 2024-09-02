import { atom } from "jotai";
import { Score } from "../types/Score";

export const scoreAtom = atom<Score>({
  rainwater: 0,
  waterLost: 0,
});
