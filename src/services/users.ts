import { User } from "../screens/example1/models/user";
import { api } from "../utils/axios/axiosUtils";

export const getAllUsers = async (): Promise<User[]> => {
  return (await api.get("users")).data;
};
