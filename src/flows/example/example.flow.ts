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
    initialPage: {},
  });

example.step("example1")({
  confirm: "example2",
});

example.step("example2")({
  test: "example1",
});

example.step("authentication")({
  login: "initialPage",
  signup: "authentication",
  goBack: "authentication",
});

example.step("initialPage")({
  logout: "authentication",
});
