import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './auth'

export const store = configureStore({
  reducer: {
    user:authSlice
  },
})