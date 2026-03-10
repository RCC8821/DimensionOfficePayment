import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import {approve1Api} from "./features/approve1Slice"
import {approve2Api} from "./features/approve2Slice"
import {billEntryApi} from "./features/BillEntry"
import {dimPaymentApi} from "./features/paymentSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [approve1Api.reducerPath]: approve1Api.reducer,
    [approve2Api.reducerPath]: approve2Api.reducer,
    [billEntryApi.reducerPath]: billEntryApi.reducer,
    [dimPaymentApi.reducerPath]: dimPaymentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(apiSlice.middleware)
  .concat(approve1Api.middleware)
  .concat(approve2Api.middleware)
  .concat(billEntryApi.middleware)
  .concat(dimPaymentApi.middleware),
});