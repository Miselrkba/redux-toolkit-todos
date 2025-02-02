import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface TodoInterface {
  id: string
  title: string
}

interface TodosDataState {
  todos: TodoInterface[]
  status: string
}

const initialState: TodosDataState = {
  todos: [],
  status: "",
}

export const fetchTodosDataThunk = createAsyncThunk<TodoInterface[]>(
  "todosData/fetchTodosDataThunk",
  async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=10",
    )
    return data
  },
)

const todosDataSlice = createSlice({
  name: "todosData",
  initialState,
  reducers: {
    addTodoAction: (state, action: PayloadAction<TodoInterface>) => {
      state.todos.unshift(action.payload)
    },
    updateTodoAction: (state, action: PayloadAction<TodoInterface>) => {
      const index = state.todos.findIndex(i => i.id === action.payload.id)
      state.todos[index] = action.payload
    },
    deleteTodoAction: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(i => i.id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodosDataThunk.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchTodosDataThunk.fulfilled, (state, action) => {
        state.status = "loaded"
        state.todos = action.payload
      })
      .addCase(fetchTodosDataThunk.rejected, state => {
        state.status = "error"
      })
  },
})

export const { addTodoAction, updateTodoAction, deleteTodoAction } =
  todosDataSlice.actions
export default todosDataSlice.reducer
