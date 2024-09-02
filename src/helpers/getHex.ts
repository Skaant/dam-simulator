export function getHex(value: number): string {
  return value >= 0
    ? value < 10
      ? value.toString()
      : value < 16
      ? value === 10
        ? "a"
        : value === 11
        ? "b"
        : value === 12
        ? "c"
        : value === 13
        ? "d"
        : value === 14
        ? "e"
        : "f"
      : `getHex error ! value > 16 (${value})`
    : `getHex error ! value < 0 (${value})`;
}
