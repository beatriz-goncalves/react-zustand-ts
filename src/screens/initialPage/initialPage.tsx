import React, { useEffect } from "react";
import NavbarComponent from "../../components/navbar/navbar";
import { useFlow } from "react-flow-app";
import { flowManager } from "../../flows";
import { useStore } from "../../store/store";

const InitialPageScreen: React.FC = () => {
  const { dispatch } = useFlow(flowManager.screens.initialPage);

  const useStoreData = useStore((state) => ({
    setFlowData: state.setFlowData,
  }));

  useEffect(() => {
    useStoreData.setFlowData({ currentPage: "initialPage" });
  }, []);

  return (
    <div>
      <NavbarComponent dispatch={dispatch} />
    </div>
  );
};

export default InitialPageScreen;
