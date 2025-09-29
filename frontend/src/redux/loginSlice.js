import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../utils/api.js";

const API_BASE_URL = "/api/v2/";

//login function
export const loginFunction = createAsyncThunk(
    "login",
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await api.post(`/login`, {
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
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.loginError = null;
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
            })
            .addCase(loginFunction.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = action.payload;
            });
    },
});

export const { clearErrors } = loginSlice.actions;
export default loginSlice.reducer;
