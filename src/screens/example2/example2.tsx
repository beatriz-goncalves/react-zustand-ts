import React, { useEffect } from "react";
import { useStore } from "../../store/store";

const Example2Screen: React.FC = () => {
  const useStoreData = useStore((state) => ({
    setFlowData: state.setFlowData,
  }));

  useEffect(() => {
    useStoreData.setFlowData({ currentPage: "example2" });
  }, []);

  return (
    <div>
      <h1>Example 2 Screen</h1>
    </div>
  );
};

export default Example2Screen;
