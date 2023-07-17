import { flowManager } from "../flowManager";

const getData = sessionStorage.getItem("data");

const currentStep = getData ? JSON.parse(getData) : null;

export const example = flowManager
  .flow({
    name: "react-zustand-ts",
    baseUrl: "react-zustand-ts",
  })
  .steps({
    authentication: {
      initialStep: currentStep?.flowData.currentPage === "authentication",
    },
    example1: {
      initialStep: currentStep?.flowData.currentPage === "example1",
    },
    example2: {
      initialStep: currentStep?.flowData.currentPage === "example2",
    },
    initialPage: {
      initialStep: currentStep?.flowData.currentPage === "initialPage",
    },
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
