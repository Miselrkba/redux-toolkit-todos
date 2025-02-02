import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import AddNewItemForm from "./features/AddNewItemForm"
import "./App.scss"
import TodoList from "./features/TodoList"
import { fetchTodosDataThunk } from "./features/todosDataSlice"

const App = () => {
  const dispatch = useAppDispatch()
  const statusValue = useAppSelector(state => state.todosData.status)

  useEffect(() => {
    dispatch(fetchTodosDataThunk())
  }, [dispatch])

  return (
    <div className="appContainer">
      {statusValue === "loading" && <p>Loading</p>}
      {statusValue === "error" && <p>Error</p>}
      {statusValue === "loaded" && (
        <>
          <h1>Redux todo app</h1>
          <AddNewItemForm />
          <TodoList />
        </>
      )}
    </div>
  )
}

export default App
