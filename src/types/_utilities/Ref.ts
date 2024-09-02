import { Id } from "./Id";

export type Ref<T extends Id> = T["id"];
