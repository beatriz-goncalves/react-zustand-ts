import { flowManager } from "../flowManager";

export const example = flowManager
  .flow({
    name: "react-zustand-ts",
    baseUrl: "react-zustand-ts",
  })
  .steps({
    authentication: {},
    example1: {},
    example2: {},
  });

example.step("example1")({
  confirm: "example2",
});

example.step("example2")({
  test: "example1",
});

example.step("authentication")({
  login: "example1",
  signup: "authentication",
  goBack: "authentication",
});
