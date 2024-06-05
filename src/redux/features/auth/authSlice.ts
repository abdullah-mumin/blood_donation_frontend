import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  exp: number;
  iat: number;
  role: string;
  email: string;
  name: string;
};

type TInstialState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TInstialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const setCurrentUser = (state: RootState) => state.auth.user;
