import { configureStore } from '@reduxjs/toolkit'
import todosDataReducer from '../features/todosDataSlice'

export const store = configureStore({
  reducer: {
    todosData: todosDataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
