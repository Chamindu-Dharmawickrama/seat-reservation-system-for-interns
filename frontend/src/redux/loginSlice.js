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

const initialState = {
    user: [],
    loginError: null,
    loginLoading: false,
    role: null,
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
                state.user = action.payload; //the login output
                console.log(action.payload.data.token);
                state.role = action.payload.data.user.role;
                // token save to the local storaage
                localStorage.setItem("token", action.payload.data.token);
            })
            .addCase(loginFunction.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = action.payload;
            });
    },
});

export const { clearErrors, logout } = loginSlice.actions;
export default loginSlice.reducer;
