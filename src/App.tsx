import React, { useCallback } from "react";
import Grid from "./components/Grid/Grid";
import { useAtom } from "jotai";
import { turnAtom } from "./atoms/turn.atom";
import { cellsAtom } from "./atoms/cells.atom";
import { passTurn } from "./use-cases/passTurn";
import { scoreAtom } from "./atoms/score.atom";

export default function App() {
  const [cells, setCells] = useAtom(cellsAtom);
  const [turn, setTurn] = useAtom(turnAtom);
  const [score, setScore] = useAtom(scoreAtom);
  const _passTurn = useCallback(
    () => passTurn({ cells, setCells, turn, setTurn, score, setScore }),
    [cells, setCells, turn, setTurn]
  );
  return (
    <div>
      <div>
        Eau tombée : {score.rainwater} / Eau perdue :{" "}
        {Math.round(score.waterLost)}
      </div>
      <Grid />
      <button onClick={_passTurn}>Tour suivant ({turn})</button>
    </div>
  );
}
