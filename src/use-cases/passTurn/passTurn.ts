import { rainFalls } from "./rainFalls";
import { waterFlows } from "./waterFlows/waterFlows";
import { getFlowingWaterCells } from "./waterFlows/getFlowingWaterCells/getFlowingWaterCells";
import { CellSlopes } from "../../types/Grid/cells/CellSlopes";
import { Cell } from "../../types/Grid/cells/Cell";
import { Index } from "../../types/_utilities/Index";
import { SetAtom } from "../../types/_utilities/SetAtom";
import { Score } from "../../types/Score";
import { Turn } from "../../types/Turn";

export async function passTurn({
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
}) {
  let cells = { ..._cells };
  let score = { ..._score };

  let turn = {
    ..._turn,
    count: _turn.count + 1,
    rain: _turn.forecast,
    forecast: Math.floor(Math.random() * 5) || 1,
  };
  setTurn(() => turn);

  // Rain iterations
  while (turn.rain) {
    const rainResult = await rainFalls({
      cells,
      setCells,
      score,
      setScore,
      turn,
      setTurn,
    });
    cells = rainResult.cells;
    score = rainResult.score;
    turn = rainResult.turn;
    const flowResult = await waterFlows({
      cells,
      setCells,
      score,
      setScore,
    });
    if (flowResult) {
      cells = flowResult.cells;
      score = flowResult.score;
    }
  }

  // Remaining water restitution
  let flowingCells: undefined | (Cell & CellSlopes)[] =
    getFlowingWaterCells(cells);
  do {
    const res = await waterFlows({ cells, setCells, score, setScore });
    if (res) {
      cells = res.cells;
      score = res.score;
      flowingCells = getFlowingWaterCells(cells);
    } else flowingCells = [];
  } while (flowingCells.length);
}
