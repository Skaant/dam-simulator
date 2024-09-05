import { atom } from "jotai";
import { Score } from "../types/Score";
import { GRID } from "../data/grid";
import _ from "lodash";

export const scoreAtom = atom<Score>({
  rainwater: _.sum(_.values(GRID).map(({ water }) => water)),
  waterLost: 0,
});
