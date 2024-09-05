/** @returns `[-x, x, -y, y]` */
export function getCellNeighborsId(
  x: number,
  y: number
): [string, string, string, string] {
  return [
    `x${x - 1}y${y}`,
    `x${x + 1}y${y}`,
    `x${x}y${y - 1}`,
    `x${x}y${y + 1}`,
  ];
}
