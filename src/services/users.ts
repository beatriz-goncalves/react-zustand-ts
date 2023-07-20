import { User } from "../screens/usersScreen/models/user";
import { api } from "../utils/axios/axiosUtils";

export const getAllUsers = async (): Promise<User[]> => {
  return (await api.get("users")).data;
};
