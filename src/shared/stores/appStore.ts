import { configureStore } from "@reduxjs/toolkit";
import { directorApi } from "@/shared/api/directorApi";

export const appStore = configureStore({
    reducer: {
        [directorApi.reducerPath]: directorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(directorApi.middleware),
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
