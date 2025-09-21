import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import adminReducer from "./adminSlice";
import seatReducer from "./seatSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        admin: adminReducer,
        seats: seatReducer,
    },
});
