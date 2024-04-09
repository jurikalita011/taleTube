import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

interface StoryBooks {}

export const storyBookApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<StoryBooks, void>({
      query: () => `/photos`,
    }),
  }),
});
