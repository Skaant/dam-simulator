import _ from "lodash";
import { Index } from "../types/_utilities/Index";
import { Cell } from "../types/Grid/Cell";
import { getCalculatedCells } from "../components/Grid/helpers/getCalculatedCells";
import { Score } from "../types/Score";

export function passTurn({
  cells,
  setCells,
  turn,
  setTurn,
  score,
  setScore,
}: {
  cells: Index<Cell>;
  setCells: (value: Index<Cell>) => void;
  turn: number;
  setTurn: (value: number) => void;
  score: Score;
  setScore: (value: Score) => void;
}) {
  const _cells = { ...cells };
  const calculatedCells = getCalculatedCells(cells);
  let _score = { ...score };
  // FLOW
  let timer = 0;
  calculatedCells
    .sort((a, b) => b.z - a.z)
    .forEach(({ id, neighbors, slopes }) => {
      const _soilLayers = [..._cells[id].soilLayers];
      const water = _soilLayers[0].water || 0;
      const totalSlopes = _.sum(
        Object.values(slopes).filter((slope) => typeof slope === "number")
      );
      Object.entries(slopes)
        .filter(([direction, slope]) => typeof slope === "number")
        .forEach(([direction, slope]) => {
          if (neighbors[direction]) {
            const __soilLayers = [..._cells[neighbors[direction]].soilLayers];
            __soilLayers[0] = {
              ...__soilLayers[0],
              water:
                (__soilLayers[0].water || 0) +
                water * ((slope as number) / totalSlopes),
            };
            _cells[neighbors[direction]] = {
              ..._cells[neighbors[direction]],
              soilLayers: __soilLayers,
            };
          } else {
            _score = {
              ..._score,
              waterLost:
                _score.waterLost + water * ((slope as number) / totalSlopes),
            };
            console.log(_score.waterLost);
          }
        });
      console.log("a", id, _cells[id].soilLayers[0].water);
      setTimeout(() => {
        _soilLayers[0] = {
          ..._soilLayers[0],
          water: 0,
        };
        _cells[id] = {
          ..._cells[id],
          soilLayers: _soilLayers,
        };
        setCells({ ..._cells });
        setScore({ ..._score });
      }, 250 * timer);
      timer++;
    });
  // RAIN
  setTimeout(() => {
    const rain = Math.floor(Math.random() * 5) || 1;
    _.forEach(_cells, (cell) => {
      const _soilLayers = [..._cells[cell.id].soilLayers];
      _soilLayers[0] = {
        ..._soilLayers[0],
        water: (_soilLayers[0].water || 0) + rain,
      };
      _cells[cell.id] = {
        ..._cells[cell.id],
        soilLayers: _soilLayers,
      };
    });
    setCells({ ..._cells });
    _score.rainwater += rain * Object.keys(_cells).length;
    console.log("kan");
    setScore({
      ..._score,
    });
  }, 500 + 250 * timer);
  setTurn(turn + 1);
}
