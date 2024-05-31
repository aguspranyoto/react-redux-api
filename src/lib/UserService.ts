import { IUser, IUserForm } from "../types/User.type";
import ApiConfig from "./ApiConfig";
import HttpService from "./HttpService";

export const getUsersApi = async () => {
  return await HttpService.get<IUser[]>(ApiConfig.user);
};

export const createUserApi = async (data: IUserForm) => {
  return await HttpService.post<IUser>(ApiConfig.user, data);
};

export const updateUserApi = async (id: string, data: IUserForm) => {
  return await HttpService.put<IUser>(`${ApiConfig.user}/${id}`, data);
};

export const getUserByIdApi = async (id: string) => {
  return await HttpService.get<IUser>(`${ApiConfig.user}/${id}`);
};

export const deleteUserApi = async (id: string) => {
  return await HttpService.delete<IUser>(`${ApiConfig.user}/${id}`);
};
