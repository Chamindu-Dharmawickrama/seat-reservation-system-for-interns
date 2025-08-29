import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "/api/v2/";

//login function
export const loginFunction = createAsyncThunk("login", async () => {
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                ...loginData,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    };
});

const initialState = {
    user: [],
    loginError: false,
    loginLoading: false,
};

const loginSlice = createSlice({
    name: "login",
    initialState,

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

export default loginSlice.reducer;
