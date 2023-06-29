import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from "../interface/interface";

const apiKey = import.meta.env.VITE_API_KEY;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.omdbapi.com/" }),
  endpoints: (builder) => ({
    getMovieBySearch: builder.query<Movie, string>({
      query: (movieName) => ({
        url: `?t=${movieName}&apikey=${apiKey}`,
      }),
    }),
  }),
});

export const { useGetMovieBySearchQuery } = movieApi;
