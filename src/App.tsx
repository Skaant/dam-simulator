import React, { useCallback } from "react";
import Grid from "./components/Grid/Grid";
import { createStore, Provider, useAtom } from "jotai";
import { turnAtom } from "./atoms/turn.atom";
import { passTurn } from "./use-cases/passTurn/passTurn";
import { scoreAtom } from "./atoms/score.atom";
import { cellsAtom } from "./atoms/cells.atom";

export default function App() {
  const [cells, setCells] = useAtom(cellsAtom);
  const [turn, setTurn] = useAtom(turnAtom);
  const [score, setScore] = useAtom(scoreAtom);
  return (
    <div>
      <div>
        Eau tombée : {score.rainwater} / Eau perdue :{" "}
        {Math.round(score.waterLost)} / Pluie restante : {turn.rain}
      </div>
      <button
        onClick={() =>
          passTurn({ cells, setCells, score, setScore, turn, setTurn })
        }
      >
        Tour suivant ({turn.count}) / Pluie : {turn.forecast}
      </button>
      <Grid />
    </div>
  );
}
