import { example } from "./example";

export * from "./flowManager";

export const flows = {
  example,
};

export type Flows = keyof typeof flows;
