import React, { useState } from "react"
import moment from 'moment'

function Form(props) {
  const DEFAULT_PRIORITY = "Normal"
  const DEFAULT_DATE = moment().format("YYYY-MM-DD")

  const { isEditForm } = props

  const [name, setName] = useState(props.name || '')
  const [description, setDescription] = useState(props.description || '')
  const [dueDate, setDueDate] = useState(props.dueDate || DEFAULT_DATE)
  const [priority, setPriority] = useState(props.priority || DEFAULT_PRIORITY)
  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) {
      return
    }
    if (moment(dueDate).isBefore(DEFAULT_DATE)) {
      alert("Invalid date, due date must greater or equal to today")
      return
    }
    if (isEditForm) props.updateTask({ name, description, dueDate, priority })
    else {
      props.addTask({ name, description, dueDate, priority })
      setName("")
      setDescription("")
      setPriority(DEFAULT_PRIORITY)
      setDueDate(DEFAULT_DATE)
    }
  }


  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleChangeDueDate(e) {
    setDueDate(e.target.value)
  }

  function handleChangePriority(e) {
    setPriority(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input input__md"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChangeName}
        placeholder="Add new task"
        required
      />
      <h2 className="label-wrapper">
        <label htmlFor="description-box" className="label__md">
          Description
        </label>
      </h2>
      <textarea
        rows="5"
        id="description-box"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={description}
        onChange={handleChangeDescription}
      />
      <div className="w-50 w-50__left">
        <h2 className="label-wrapper">
          <label htmlFor="dueDate-input" className="label__md">
            Due Date
          </label>
        </h2>
        <input
          type="date"
          id="dueDate-input"
          className="input input__md"
          name="text"
          value={dueDate}
          min={DEFAULT_DATE}
          onChange={handleChangeDueDate}
        />
      </div>
      <div className="w-50 w-50__right">
        <h2 className="label-wrapper">
          <label htmlFor="dueDate-input" className="label__md">
            Priority
          </label>
        </h2>
        <select
          className="input input__md"
          autoComplete="off"
          value={priority}
          onChange={handleChangePriority}
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" className="btn btn__primary btn__lg sumbitButton">
        {isEditForm ? 'Update' : 'Add'}
      </button>
    </form>
  )
}

export default Form
