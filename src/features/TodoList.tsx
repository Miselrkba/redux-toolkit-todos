import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteTodoAction, updateTodoAction } from "./todosDataSlice"

interface Item {
  id: string
  title: string
}

const TodoList = () => {
  const dispatch = useAppDispatch()
  const todosData = useAppSelector(state => state.todosData.todos)
  const [editId, setEditId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleEditInit = (id: string, currentTitle: string) => {
    setEditId(id)
    setEditValue(currentTitle)
  }

  const handleEditConfirm = (id: string) => {
    dispatch(
      updateTodoAction({
        id: id,
        title: editValue,
      }),
    )
    setEditId(null)
    setEditValue("")
  }

  return (
    <ul>
      {todosData.map((item: Item) => (
        <li key={item.id}>
          {editId === item.id ? (
            <div>
              <input
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
              />
              <button
                className="editBtn"
                onClick={() => handleEditConfirm(item.id)}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <span>{item.title}</span>
              <button
                className="editBtn"
                onClick={() => handleEditInit(item.id, item.title)}
              >
                Edit
              </button>
              <button
                className="deleteBtn"
                onClick={() => dispatch(deleteTodoAction(item.id))}
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TodoList
