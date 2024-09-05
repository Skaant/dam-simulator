import { Index } from "../../types/_utilities/Index";
import { Cell } from "../../types/Grid/cells/Cell";
import { SetAtom } from "../../types/_utilities/SetAtom";
import { Score } from "../../types/Score";
import { Turn } from "../../types/Turn";

export function rainFalls({
  cells: _cells,
  setCells,
  score: _score,
  setScore,
  turn: _turn,
  setTurn,
}: {
  cells: Index<Cell>;
  setCells: SetAtom<Index<Cell>>;
  score: Score;
  setScore: SetAtom<Score>;
  turn: Turn;
  setTurn: SetAtom<Turn>;
}): Promise<{
  cells: Index<Cell>;
  score: Score;
  turn: Turn;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cells = { ..._cells };

      const arrayCells = Object.values(cells);
      arrayCells.forEach((cell) => {
        cells[cell.id] = {
          ...cell,
          water: cell.water + 1,
        };
      });
      setCells(() => cells);

      const score = {
        ..._score,
        rainwater: _score.rainwater + arrayCells.length,
      };
      setScore(() => score);

      const turn = {
        ..._turn,
        rain: _turn.rain - 1,
      };
      setTurn(() => turn);

      resolve({ cells, score, turn });
    }, 250);
  });
}
