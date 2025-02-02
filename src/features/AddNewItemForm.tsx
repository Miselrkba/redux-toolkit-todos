import type React from "react"
import { useState } from "react"
import { useAppDispatch } from "../app/hooks"
import { nanoid } from "@reduxjs/toolkit"
import { addTodoAction } from "./todosDataSlice"

const AddNewItemForm = () => {
  const dispatch = useAppDispatch()
  const [newTitleValue, setNewTitleValue] = useState("")

  const handleNewItemSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitleValue) return
    dispatch(
      addTodoAction({
        id: nanoid(),
        title: newTitleValue,
      }),
    )
    setNewTitleValue("")
  }

  return (
    <form onSubmit={handleNewItemSubmit}>
      <input
        value={newTitleValue}
        onChange={e => setNewTitleValue(e.target.value)}
      />
      <button className="addBtn" type="submit">
        Add
      </button>
    </form>
  )
}

export default AddNewItemForm
