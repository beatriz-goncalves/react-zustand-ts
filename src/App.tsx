import React from "react";
import "./App.css";
import { FlowProvider } from "react-flow-app";
import { flowManager } from "./flows";

export const App: React.FC = () => {
  return <FlowProvider fm={flowManager} initialFlowName="react-zustand-ts" />;
};
