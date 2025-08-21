import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_AUTH_URL = 'https://identitytoolkit.googleapis.com/v1';
const API_KEY = 'AIzaSyBB4TasBb_BJ_GmK433Xn3TbgyKpHW9GwQ';

//API de usuario con RTK Query
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_AUTH_URL }),
  endpoints: (builder) => ({
    //iniciar sesión
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `/accounts:signInWithPassword?key=${API_KEY}`,
        method: 'POST',
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      }),
    }),
    //registrar un nuevo usuario
    signup: builder.mutation({
      query: ({ email, password }) => ({
        url: `/accounts:signUp?key=${API_KEY}`,
        method: 'POST',
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = userApi;
