import React from "react"
import Form from "../components/Form"

export default function Todo(props) {
  const { setEditingTask, task } = props
  const { isEditing } = task

  function handleSubmit(newTask) {
    props.editTask(props.id, newTask)
  }

  const editingTemplate = (
    <div className="editForm"><Form {...task} isEditForm={true} updateTask={handleSubmit} /></div>
  )

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.task.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn__info"
          onClick={() => setEditingTask(task.id, isEditing)}
        >
          Detail <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Remove <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  )

  return <React.Fragment><li className="todo">{viewTemplate}</li>
    {isEditing && editingTemplate}</React.Fragment>
}
