import React from "react";
import { CalculatedCell } from "../Grid/types/CalculatedCell";
import _ from "lodash";
import { Direction } from "../../types/Grid/Direction";
import { getHex } from "../../helpers/getHex";
import { CELL_SIZE } from "../../data/grid";
import DropletSVG from "./_svg/DropletSVG";
import LeftOutSlope from "./slopes/LeftOutSlope";
import LeftOutWater from "./water/LeftOutWater";
import RightOutWater from "./water/RightOutWater";
import TopOutWater from "./water/TopOutWater";
import BottomOutWater from "./water/BottomOutWater";

export default function CellWater({
  cell: { slopes, water },
  grid: { x, y },
}: {
  cell: Pick<CalculatedCell, "slopes" | "water">;
  grid: { x: number; y: number };
}) {
  const SIZE_1_4 = CELL_SIZE * 0.25;
  const SIZE_1_2 = CELL_SIZE * 0.5;
  const SIZE_1_8 = CELL_SIZE * 0.125;
  return (
    <>
      {(
        Object.entries(slopes) as [Direction, number | "equal" | "block"][]
      ).map(([direction, value]) => {
        if (direction === "-x")
          if (typeof value === "number")
            return water > 0 && <LeftOutWater x={x} y={y} value={value} />;

        if (direction === "x")
          if (typeof value === "number")
            return water > 0 && <RightOutWater x={x} y={y} value={value} />;

        if (direction === "-y")
          if (typeof value === "number")
            return water > 0 && <BottomOutWater x={x} y={y} value={value} />;
        if (direction === "y")
          if (typeof value === "number")
            return water > 0 && <TopOutWater x={x} y={y} value={value} />;
      })}
      {water > 0 && (
        <>
          <DropletSVG x={x + SIZE_1_4} y={y} water={water} />
          <text
            x={x + SIZE_1_2}
            y={y + SIZE_1_4 + SIZE_1_8}
            textAnchor="middle"
          >
            {water.toString().slice(0, 4)}
          </text>
        </>
      )}
    </>
  );
}
