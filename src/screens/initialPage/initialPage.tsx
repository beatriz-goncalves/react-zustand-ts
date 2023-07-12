import { useCallback } from "react";
import NavbarComponent from "../../components/navbar/navbar";
import { useStore } from "../../store/store";
import { useFlow } from "react-flow-app";
import { flowManager } from "../../flows";
import { UserAuthentication } from "../loginSignup/models/user";

const InitialPageScreen: React.FC = () => {
  const userWithAutentication = useStore(
    (state) => state.usersWithAuthentication
  );
  const userLogout = userWithAutentication.find((user) => user.isLogged);
  const logout = useStore((state) => state.logout);
  const { dispatch } = useFlow(flowManager.screens.initialPage);

  const onHandleLogoutAction = useCallback(() => {
    logout(userLogout as UserAuthentication);
    dispatch("logout");
  }, [userWithAutentication]);

  return (
    <div>
      <NavbarComponent
        userLogged={userLogout?.name}
        logout={onHandleLogoutAction}
      />
    </div>
  );
};

export default InitialPageScreen;
