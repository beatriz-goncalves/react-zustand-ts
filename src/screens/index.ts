import React from "react";

export const screens = {
  example1: {
    name: "example1",
    actions: ["confirm"],
    loader: (): React.LazyExoticComponent<any> =>
      React.lazy(() => import("./example1/example1")),
  },
  example2: {
    name: "example2",
    actions: ["test"],
    loader: (): React.LazyExoticComponent<any> =>
      React.lazy(() => import("./example2/example2")),
  },
  authentication: {
    name: "authentication",
    actions: ["login", "signup", "goBack"],
    loader: (): React.LazyExoticComponent<any> =>
      React.lazy(() => import("./loginSignup/loginSignup")),
  },
  initialPage: {
    name: "initialPage",
    actions: ["logout"],
    loader: (): React.LazyExoticComponent<any> =>
      React.lazy(() => import("./initialPage/initialPage")),
  },
} as const;
