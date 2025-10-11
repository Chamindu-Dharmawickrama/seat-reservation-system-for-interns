import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api.js";

// fetch all reservations
export const fetchAllReservations = createAsyncThunk(
    "fetchAllReservations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/reservations");
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch emails"
            );
        }
    }
);

// make a reservation
export const makeReservation = createAsyncThunk(
    "makeReservations",
    async (reservation, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/reservations/newReservation",
                reservation
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add new reservation"
            );
        }
    }
);

// make a reservation
export const deleteReservation = createAsyncThunk(
    "deleteReservation",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(
                `/reservations/deleteReservation/${id}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete reservation"
            );
        }
    }
);

const initialState = {
    reservations: [],
    reservationLoading: false,
    reservationError: null,
    newReservationSuccess: false,

    deleteReservationLoading: false,
    deleteReservationError: false,
    deleteReservationSuccess: false,
};

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.reservationError = null;
            state.deleteReservationError = null;
        },
        resetReservationOperation :(state)=>{
            state.newReservationSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllReservations.pending, (state) => {
                state.reservationLoading = true;
                state.reservationError = null;
            })
            .addCase(fetchAllReservations.fulfilled, (state, action) => {
                state.reservationLoading = false;
                state.reservations = action.payload;
            })
            .addCase(fetchAllReservations.rejected, (state, action) => {
                state.reservationLoading = false;
                state.reservationError = action.payload;
            })
            .addCase(makeReservation.pending, (state) => {
                state.reservationLoading = true;
                state.reservationError = null;
            })
            .addCase(makeReservation.fulfilled, (state, action) => {
                state.reservationLoading = false;
                state.newReservationSuccess = true;
                //state.reservations=action.payload;
            })
            .addCase(makeReservation.rejected, (state, action) => {
                state.reservationLoading = false;
                state.reservationError = action.payload;
                state.newReservationSuccess = false;
            })
            .addCase(deleteReservation.pending, (state) => {
                state.deleteReservationLoading = true;
                state.deleteReservationError = null;
            })
            .addCase(deleteReservation.fulfilled, (state, action) => {
                state.deleteReservationLoading = false;
                state.deleteReservationSuccess = true;
                //state.reservations = action.payload;
            })
            .addCase(deleteReservation.rejected, (state, action) => {
                state.deleteReservationLoading = false;
                state.deleteReservationError = action.payload;
                state.deleteReservationSuccess = false;
            });
    },
});

export const { clearErrors ,resetReservationOperation} = reservationSlice.actions;
export default reservationSlice.reducer;
