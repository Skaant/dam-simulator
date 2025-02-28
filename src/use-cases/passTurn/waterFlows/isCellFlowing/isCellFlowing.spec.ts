import { expect, test } from "vitest";
import { createCells } from "../../../../../helpers/cells/createCells";
import { isCellFlowing } from "./isCellFlowing";

test("One flowing slope : true", () => {
  const cells = createCells(3, 3, { z: 2, water: 1 });
  cells["x1y1"].z = 1;
  cells["x2y1"].z = 0;
  expect(isCellFlowing({ cells }, "x1y1")).toBe(true);
});
test("All blocked slopes : false", () => {
  const cells = createCells(3, 3, { z: 1, water: 1 });
  cells["x1y1"].z = 0;
  expect(isCellFlowing({ cells }, "x1y1")).toBe(false);
});
test("Blocked or dams : false", () => {
  const cells = createCells(3, 3, { z: 2, water: 1 });
  cells["x1y1"].z = 1;
  cells["x2y1"].z = 0;
  cells["x1y1"].dams = {
    x: 1,
  };
  expect(isCellFlowing({ cells }, "x1y1")).toBe(false);
});
test("Equal area same water level & all blocked : false", () => {
  const cells = createCells(4, 4, { z: 1, water: 1 });
  cells["x1y1"].z = 0;
  cells["x1y2"].z = 0;
  cells["x2y2"].z = 0;
  expect(isCellFlowing({ cells }, "x1y1")).toBe(false);
});
test("Equal area same water level & all blocked or dam : false", () => {
  const cells = createCells(4, 4, { z: 2, water: 1 });
  cells["x1y1"].z = 1;
  cells["x1y2"].z = 1;
  cells["x2y2"].z = 1;
  cells["x2y1"].z = 0;
  cells["x1y1"].dams = {
    x: 1,
  };
  cells["x2y2"].dams = {
    "-y": 1,
  };
  expect(isCellFlowing({ cells }, "x1y1")).toBe(false);
});
test("Equal area smaller water level : true", () => {
  const cells = createCells(4, 4, { z: 1, water: 1 });
  cells["x1y1"].z = 0;
  cells["x1y2"].z = 0;
  cells["x2y2"].z = 0;
  cells["x2y2"].water = 0.5;
  expect(isCellFlowing({ cells }, "x1y1")).toBe(true);
});
test("Equal area bigger water level : false", () => {
  const cells = createCells(4, 4, { z: 1, water: 1 });
  cells["x1y1"].z = 0;
  cells["x1y2"].z = 0;
  cells["x2y2"].z = 0;
  cells["x1y1"].water = 0.5;
  expect(isCellFlowing({ cells }, "x1y1")).toBe(false);
});
test("Equal area others have slopes : true", () => {
  const cells = createCells(4, 4, { z: 2, water: 1 });
  cells["x1y1"].z = 1;
  cells["x1y2"].z = 1;
  cells["x2y2"].z = 1;
  cells["x3y2"].z = 0;
  expect(isCellFlowing({ cells }, "x1y1")).toBe(true);
});
