import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api.js";

const API_BASE_URL = "/api/v2/";

//login function
export const loginFunction = createAsyncThunk(
    "login",
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/login`, {
                ...loginData,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed!"
            );
        }
    }
);

const token = localStorage.getItem("token");

const initialState = {
    user: token ? JSON.parse(atob(token.split(".")[1])) : [],
    loginError: null,
    loginLoading: false,
    role: token ? JSON.parse(atob(token.split(".")[1])).role : null,
    isLogingSuccess: !!token,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.loginError = null;
        },
        logout: (state) => {
            state.user = [];
            state.role = null;
            state.loginError = null;
            state.loginLoading = false;
            state.isLogingSuccess = false;
            localStorage.removeItem("token");
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginFunction.pending, (state) => {
                state.loginLoading = true;
                state.loginError = null;
            })
            .addCase(loginFunction.fulfilled, (state, action) => {
                state.loginLoading = false;
                state.isLogingSuccess = true;
                const token = action.payload.data.token;
                // Decode the token to get user information
                state.user = JSON.parse(atob(token.split(".")[1]));
                state.role = action.payload.data.user.role;
                // token save to the local storaage
                localStorage.setItem("token", token);
            })
            .addCase(loginFunction.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = action.payload;
            });
    },
});

export const { clearErrors, logout } = loginSlice.actions;
export default loginSlice.reducer;
