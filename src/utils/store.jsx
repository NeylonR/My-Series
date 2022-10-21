import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import seriesListReducer from "../features/seriesList";
import userSeriesListReducer from "../features/userSeriesList";
import serieDetailReducer from "../features/serieDetail";

export default configureStore({
    reducer: {
        user: userReducer,
        seriesList: seriesListReducer,
        serieDetail: serieDetailReducer,
        userSeriesList: userSeriesListReducer,
    },
});