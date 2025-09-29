import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import adminReducer from "./adminSlice";
import seatReducer from "./seatSlice";
import reservationReducer from "./reservationSlice";
import registerReducer from "./registerSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        admin: adminReducer,
        seats: seatReducer,
        reservation: reservationReducer,
    },
});
