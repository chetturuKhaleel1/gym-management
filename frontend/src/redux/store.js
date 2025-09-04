import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"; // this must exist
import authReducer from "./authSlice"; // fixed above

 const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store; // export default for compatibility with older code
