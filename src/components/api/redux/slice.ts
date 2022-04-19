import { createSlice } from "@reduxjs/toolkit";

interface IState {
  token: string;
  expiredToken: boolean;
}

const initialState: IState = {
  token: localStorage.getItem("accessToken") || "",
  expiredToken: false,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state: IState, action) => {
      localStorage.setItem("accessToken", action.payload);
      return { ...state, token: localStorage.getItem("accessToken") };
    },
    removeToken: (state: IState) => {
      localStorage.removeItem("accessToken");
      return { ...state, token: "" };
    },
    resetToken: (state: IState, action) => {
      return { ...state, expiredToken: action.payload };
    },
  },
});

export const { setToken, removeToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
