import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../interface";
import { calculateAge, formateDate } from "../utils";

interface UserState {
  userList: UserInfo[];
  status: string;
  sortType: string;
  selectedUserInfo: UserInfo;
}

const initialState: UserState = {
  userList: [],
  status: "idle",
  sortType: "默认",
  selectedUserInfo: {} as UserInfo,
};

export const fetchUserList = createAsyncThunk("", async () => {
  const response = await fetch("http://localhost:8000/users");
  if (!response.ok) {
    throw new Error("Network Error");
  }
  const data = await response.json();
  const result = data.map((item: UserInfo) => ({
    ...item,
    birthday: formateDate(item.birthday),
    registeredAt: formateDate(item.registeredAt),
    age: calculateAge(item.birthday),
  }));
  return result;
});

const userSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    removeUser: (state, action: PayloadAction<string>) => {
      state.userList.filter((item: UserInfo) => item.id !== action.payload);
    },
    updateList: (state, action: PayloadAction<UserInfo[]>) => {
      state.userList = action.payload;
    },
    updateSelectedUser: (state, action: PayloadAction<string>) => {
      state.selectedUserInfo =
        state.userList.find((item: UserInfo) => item.id === action.payload) ||
        ({} as UserInfo);
    },
    sortList: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
      switch (action.payload) {
        case "id increase":
          state.userList = state.userList.sort(
            (a, b) => Number(a.id) - Number(b.id),
          );
          break;
        case "id decrease":
          state.userList = state.userList.sort(
            (a, b) => Number(b.id) - Number(a.id),
          );
          break;
        case "age increase":
          state.userList = state.userList.sort((a, b) => a.age - b.age);
          break;
        case "age decrease":
          state.userList = state.userList.sort((a, b) => b.age - a.age);
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = "success";
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { removeUser, updateList, sortList, updateSelectedUser } =
  userSlice.actions;
export default userSlice.reducer;
