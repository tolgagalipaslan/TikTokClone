import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './auth'
import showAuth from './showAuth'

export const store = configureStore({
  reducer: {
    user:authSlice,
    showAuth:showAuth
  },
})