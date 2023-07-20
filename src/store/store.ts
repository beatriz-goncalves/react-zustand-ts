import create from "zustand";
import { User } from "../screens/example1/models/user";
import { devtools } from "zustand/middleware";
import { UserAuthentication } from "../screens/loginSignup/models/user";
import { loadData, saveData } from "../utils/sessionStorage/sessionStorage";

interface FlowData {
  currentPage: string;
}

const hasLogin = true;

interface Store {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (userId: number) => void;
  hasLogin: boolean;
  hasLoginAction: (value: boolean) => void;
  usersWithAuthentication: UserAuthentication[];
  login: (user: UserAuthentication) => void;
  signup: (user: UserAuthentication) => void;
  logout: (user: UserAuthentication) => void;
  flowData: FlowData;
  setFlowData: (flow: FlowData) => void;
}

export const useStore = create<Store, [["zustand/devtools", never]]>(
  devtools((set) => ({
    users: loadData().users || [],
    addUser: (user: User) =>
      set(
        (state) => {
          const users = [
            ...state.users,
            { ...user, id: state.users.length + 1 },
          ];
          const usersState = {
            ...state,
            users: users,
          };
          saveData(usersState);
          return usersState;
        },
        false,
        "addUser"
      ),

    deleteUser: (userId: number) =>
      set(
        (state) => {
          const users = state.users.filter((user) => user.id !== userId);
          const usersState = {
            ...state,
            users: users,
          };
          saveData(usersState);
          return usersState;
        },
        false,
        "deleteUser"
      ),
    hasLogin: hasLogin,
    hasLoginAction: (value: boolean) =>
      set(
        () => ({
          hasLogin: value,
        }),
        false,
        "hasLogin"
      ),
    usersWithAuthentication: loadData().usersWithAuthentication || [],
    login: (userAuthenticated: UserAuthentication) =>
      set(
        (state) => {
          const userWithAuth = state.usersWithAuthentication.map((user) =>
            user.email === userAuthenticated.email
              ? { ...user, isLogged: true }
              : user
          );
          const userWithAuthState = {
            ...state,
            usersWithAuthentication: userWithAuth,
          };
          saveData(userWithAuthState);
          return userWithAuthState;
        },
        false,
        "login"
      ),
    signup: (user: UserAuthentication) =>
      set(
        (state) => {
          const usersWithAuth = [
            ...state.usersWithAuthentication,
            {
              ...user,
              id: state.usersWithAuthentication.length + 1,
              isLogged: false,
            },
          ];
          const usersWithAuthState = {
            ...state,
            usersWithAuthentication: usersWithAuth,
          };
          saveData(usersWithAuthState);
          return usersWithAuthState;
        },
        false,
        "signup"
      ),
    logout: (userAuthenticated: UserAuthentication) =>
      set(
        (state) => {
          const userLogout = state.usersWithAuthentication.map((user) =>
            user.email === userAuthenticated.email
              ? { ...user, isLogged: false }
              : user
          );
          const userLogoutState = {
            ...state,
            usersWithAuthentication: userLogout,
          };
          saveData(userLogoutState);
          return userLogoutState;
        },
        false,
        "logout"
      ),
    flowData: loadData() ? loadData() : {},
    setFlowData: (flow) =>
      set(
        (state) => {
          const flowState = {
            ...state,
            flowData: flow,
          };
          saveData(flowState);
          return flowState;
        },
        false,
        "flowData"
      ),
  }))
);
