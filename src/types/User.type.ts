export interface IUser {
  id: string;
  name: string;
  email: string;
}

export enum ApiStatus {
  "idle",
  "loading",
  "success",
  "error",
}

export interface IUserState {
  list: IUser[];
  singleUser: IUser;
  listStatus: ApiStatus;
  createUserStatus: ApiStatus;
  getUserByIdStatus: ApiStatus;
  deleteUserStatus: ApiStatus;
  updateUserStatus: ApiStatus;
}

export interface IUserForm {
  name: string;
  email: string;
}
