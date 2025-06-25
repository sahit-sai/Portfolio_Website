import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";
import testimonialsReducer from "./slices/testimonialsSlice";
import authReducer from "./slices/authSlice"; // Import the auth reducer
import blogsReducer from "./slices/blogsSlice";
import timelineReducer from "./slices/timelineSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    testimonials: testimonialsReducer,
    auth: authReducer, // Add the auth reducer to the store
    blogs: blogsReducer,
    timeline: timelineReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
