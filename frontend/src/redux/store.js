import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";

export default Store = configureStore({
    reducer: {
        login: loginSlice.reducer
    }
})