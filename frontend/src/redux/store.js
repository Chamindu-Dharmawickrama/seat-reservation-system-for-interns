import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import adminReducer from "./adminSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        admin: adminReducer,
    },
});
