import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

//fetch all seats
// for admin , intern dashboards
export const fetchSeats = createAsyncThunk(
    "seats/fetchSeats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/seats");
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch seats"
            );
        }
    }
);

//search seat by search term and if there any filters apply search by it also
// search seats by query
//the GET has not request body, so the params become query
// for admin , intern dashboards
export const searchSeatByTerm = createAsyncThunk(
    "/searchSeatByTerm",
    async ({ searchTerm, status }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/seats/searchSeat`, {
                params: { seatNumber: searchTerm, status },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to search seat"
            );
        }
    }
);

//add new seat
//send the data through request body
//only admin dashboard
export const addSeat = createAsyncThunk(
    "admin/addSeat",
    async (seatData, { rejectWithValue }) => {
        try {
            const response = await api.post("/seats/addSeat", seatData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add seat"
            );
        }
    }
);

//update seat information
//id send through the request params and data send through the request body
//only admin dashboard
export const updateSeat = createAsyncThunk(
    "admin/updateSeat",
    async ({ id, seatData }, { rejectWithValue }) => {
        try {
            console.log("async thunk", seatData);
            const response = await api.put(`/seats/updateSeat/${id}`, seatData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update seat"
            );
        }
    }
);

//delete seat
//id send through the request params
//only admin dashboard
export const deleteSeat = createAsyncThunk(
    "admin/deleteSeat",
    async (seatId, { rejectWithValue }) => {
        try {
            await api.delete(`/seats/delete/${seatId}`);
            return seatId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete seat"
            );
        }
    }
);

const initialState = {
    seats: [],
    seatsLoading: false,
    seatsError: null,
};

const seatSlice = createSlice({
    name: "seatSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Seats (admin/intern)
            .addCase(fetchSeats.pending, (state) => {
                state.seatsLoading = true;
                state.seatsError = null;
            })
            .addCase(fetchSeats.fulfilled, (state, action) => {
                state.seatsLoading = false;
                state.seats = action.payload;
            })
            .addCase(fetchSeats.rejected, (state, action) => {
                state.seatsLoading = false;
                state.seatsError = action.payload;
            })

            // search seats (admin/intern)
            .addCase(searchSeatByTerm.pending, (state) => {
                state.seatsLoading = true;
                state.seatsError = null;
            })
            .addCase(searchSeatByTerm.fulfilled, (state, action) => {
                state.seatsLoading = false;
                state.seats = action.payload;
            })
            .addCase(searchSeatByTerm.rejected, (state, action) => {
                state.seatsLoading = false;
                state.seatsError = action.payload;
            });
    },
});

export default seatSlice.reducer;
