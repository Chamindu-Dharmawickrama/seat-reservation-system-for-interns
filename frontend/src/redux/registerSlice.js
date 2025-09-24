import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

// user register
export const register = createAsyncThunk(
    "register",
    async (data, { rejectedWithValues }) => {
        try {
            const response = await api.post("/register", data);
            return response.data;
        } catch (error) {
            return rejectedWithValues(
                error.response?.data?.message || "Registration failed!"
            );
        }
    }
);

const initialState = {
    //register function intial state
    register: {
        registeredData: null,
        loading: false,
        error: null,
        success: true,
    },
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.register.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // register function
            .addCase(register.pending, (state) => {
                state.register.loading = true;
                state.register.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.register.loading = false;
                state.register.error = null;
                state.register.success = true;
                state.register.registeredData = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.register.loading = false;
                state.register.error = action.payload;
                state.register.success = false;
                state.register.registeredData = null;
            });
    },
});

// export clear  error function
export const { clearErrors } = registerSlice.actions;
export default registerSlice.reducer;
