import { Direction } from "./Direction";

export type DirectionIndex<T> = { [key in Direction]?: T };
