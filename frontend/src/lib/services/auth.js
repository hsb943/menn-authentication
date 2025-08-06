import dotenv from 'dotenv';
dotenv.config() 

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



// Define a service using a base URL and expected endpoints 
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://authentication.local/api/user"}),
    endpoints: (builder) => ({

        createUser: builder.mutation({
            query: (user) => {
                return{
                    url: 'register',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),

        verifyEmail: builder.mutation({
            query: (user) => {
                return{
                    url: 'verify-email',
                    method: 'POST',
                    body: user, 
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),

        loginUser: builder.mutation({
            query: (user) => {
                return{
                    url: 'login',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    },
                    credentials: 'include' 
                }
            }
        }),

        getUser: builder.query({
            query: () => {
                return {
                    url: 'me',
                    method: 'GET',
                    credentials: 'include'
                }
            }
        }),

        logoutUser: builder.mutation({
            query: () => {
                return {
                    url: 'logout',
                    method: 'POST',
                    body: {},
                    credentials: 'include'
                }
            }
        }),

        resetPasswordLink: builder.mutation({
            query: (user) => {
                return {
                    url: 'reset-password-link',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),

        resetPassword: builder.mutation({
            query: (data) =>{
                const { id, token } = data 
                const actualData = { ...values }
                return {
                    url: `/reset-password/${id}/${token}`,
                    method: 'POST',
                    body: actualData,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),

        changePassword: builder.mutation({
            query: (actualData) => {
                return {
                    url: 'change-password',
                    method: 'POST',
                    body: actualData,
                    credentials: 'include'

                }
            }
        })
    })
})

export const { useCreateUserMutation, useVerifyEmailMutation, useLoginUserMutation, useGetUserQuery, useLogoutUserMutation, useResetPasswordLinkMutation, useResetPasswordMutation, useChangePasswordMutation } = authApi
