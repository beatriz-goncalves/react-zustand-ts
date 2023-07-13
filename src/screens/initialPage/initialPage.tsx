import NavbarComponent from "../../components/navbar/navbar";
import { useFlow } from "react-flow-app";
import { flowManager } from "../../flows";

const InitialPageScreen: React.FC = () => {
  const { dispatch } = useFlow(flowManager.screens.initialPage);

  return (
    <div>
      <NavbarComponent dispatch={dispatch} />
    </div>
  );
};

export default InitialPageScreen;
