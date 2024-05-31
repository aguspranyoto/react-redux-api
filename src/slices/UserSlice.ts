import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IUser, IUserForm, IUserState } from "../types/User.type";
import {
  createUserApi,
  deleteUserApi,
  getUserByIdApi,
  getUsersApi,
  updateUserApi,
} from "../lib/UserService";
import { toastError, toastSuccess } from "../lib/ToastifyConfig";

const initialState: IUserState = {
  list: [],
  singleUser: {} as IUser,
  listStatus: ApiStatus.idle,
  createUserStatus: ApiStatus.idle,
  getUserByIdStatus: ApiStatus.idle,
  deleteUserStatus: ApiStatus.idle,
  updateUserStatus: ApiStatus.idle,
};

export const getUserListAction = createAsyncThunk(
  "user/getUserListAction",
  async () => {
    const response = await getUsersApi();
    return response.data;
  }
);

export const createUserAction = createAsyncThunk(
  "user/createUserAction",
  async (data: IUserForm) => {
    const res = await createUserApi(data);
    return res.data;
  }
);

export const getUserByIdAction = createAsyncThunk(
  "user/getUserByIdAction",
  async (id: string) => {
    const res = await getUserByIdApi(id);
    return res.data;
  }
);

export const deleteUserAction = createAsyncThunk(
  "user/deleteUserAction",
  async (id: string) => {
    const res = await deleteUserApi(id);
    return res.data;
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUserAction",
  async ({ id, data }: { id: string; data: IUserForm }) => {
    const res = await updateUserApi(id, data);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateUserStatus: (state) => {
      state.createUserStatus = ApiStatus.idle;
    },
    resetUpdateUserStatus: (state) => {
      state.updateUserStatus = ApiStatus.idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserListAction.pending, (state) => {
        state.listStatus = ApiStatus.loading;
      })
      .addCase(getUserListAction.fulfilled, (state, action) => {
        state.list = action.payload;
        state.listStatus = ApiStatus.idle;
      })
      .addCase(getUserListAction.rejected, (state) => {
        state.listStatus = ApiStatus.error;
      })
      .addCase(createUserAction.pending, (state) => {
        state.createUserStatus = ApiStatus.loading;
      })
      .addCase(createUserAction.fulfilled, (state) => {
        state.createUserStatus = ApiStatus.success;
        toastSuccess("User created successfully");
      })
      .addCase(createUserAction.rejected, (state) => {
        state.createUserStatus = ApiStatus.error;
        toastError("Failed to create user");
      })
      .addCase(getUserByIdAction.pending, (state) => {
        state.getUserByIdStatus = ApiStatus.loading;
      })
      .addCase(getUserByIdAction.fulfilled, (state, action) => {
        state.singleUser = action.payload;
        state.getUserByIdStatus = ApiStatus.idle;
      })
      .addCase(getUserByIdAction.rejected, (state) => {
        state.getUserByIdStatus = ApiStatus.error;
      })
      .addCase(deleteUserAction.pending, (state) => {
        state.deleteUserStatus = ApiStatus.loading;
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user.id !== action.payload.id);
        state.deleteUserStatus = ApiStatus.idle;
      })
      .addCase(deleteUserAction.rejected, (state) => {
        state.deleteUserStatus = ApiStatus.error;
      })
      .addCase(updateUserAction.pending, (state) => {
        state.updateUserStatus = ApiStatus.loading;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.list = state.list.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
        if (state.singleUser.id === action.payload.id) {
          state.singleUser = action.payload;
        }
        state.updateUserStatus = ApiStatus.success;
        toastSuccess("User updated successfully");
      })
      .addCase(updateUserAction.rejected, (state) => {
        state.updateUserStatus = ApiStatus.error;
        toastError("Failed to update user");
      });
  },
});

export default userSlice.reducer;
export const { resetCreateUserStatus, resetUpdateUserStatus } =
  userSlice.actions;
