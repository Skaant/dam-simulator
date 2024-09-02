import { Id } from "./Id";

/** Use `Ref<T>` as `id` */
export type Index<T extends Id> = { [id: string]: T };
