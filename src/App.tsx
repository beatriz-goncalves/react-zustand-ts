import React from "react";
import "./App.css";
import { FlowProvider } from "react-flow-app";
import { flowManager } from "./flows";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App: React.FC = () => {
  return (
    <div>
      <FlowProvider fm={flowManager} initialFlowName="react-zustand-ts" />;
      <ToastContainer />
    </div>
  );
};
