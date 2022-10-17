import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import seriesListReducer from "../features/seriesList";

export default configureStore({
    reducer: {
        user: userReducer,
        seriesList: seriesListReducer,
    },
});