// src/redux/api/planApiSlice.js
import { apiSlice } from "./apiSlice";

export const planApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => "/plans",
      providesTags: ["Plan"],
    }),
    createPlan: builder.mutation({
      query: (data) => ({
        url: "/plans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Plan"],
    }),
  }),
});

export const { useGetPlansQuery, useCreatePlanMutation } = planApiSlice;
