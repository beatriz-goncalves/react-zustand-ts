import create from "zustand";
import { User } from "../screens/example1/models/user";
import { devtools } from "zustand/middleware";
import { UserAuthentication } from "../screens/loginSignup/models/user";
import { loadData, saveData } from "./sessionStorage/sessionStorage";

const usersInitialState: User[] = [
  { id: 1, name: "Teyim Asobo" },
  { id: 2, name: "Fru Brian" },
];

const usersWithAuthentication: UserAuthentication[] = [];

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
}

export const useStore = create<Store, [["zustand/devtools", never]]>(
  devtools((set) => ({
    users: loadData().users ? loadData().users : usersInitialState,
    addUser: (user: User) =>
      set(
        (state) => {
          const users = [
            ...state.users,
            { ...user, id: state.users.length + 1 },
          ];
          const usersState = {
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
    usersWithAuthentication: loadData().usersWithAuthentication
      ? loadData().usersWithAuthentication
      : usersWithAuthentication,
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
  }))
);
