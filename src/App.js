import React, { useState } from "react"
import Form from "./components/Form"
import Todo from "./components/Todo"
import { nanoid } from "nanoid"
import useLocalStorage from "./hooks/useLocalStorage"

function App(props) {
  const [tasks, setTasks] = useLocalStorage("tasks", [])
  const [tasksSearch, setTasksSearch] = useState('')

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
  }

  function editTask(id, newTask) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, ...newTask }
      }
      return task
    })
    setTasks(editedTaskList)
  }

  function addTask(task) {
    const newTask = { id: "todo-" + nanoid(), ...task, completed: false }
    setTasks([...tasks, newTask])
  }

  function setEditingTask(id, isEditing) {
    const newTask = tasks.map(task => {
      return { ...task, isEditing: task.id === id }
    })

    // Handle case close detail box
    if (isEditing) {
      const edittingTask = newTask.find(task => task.id === id)
      edittingTask.isEditing = !edittingTask.isEditing
    }
    setTasks(newTask)
  }

  function handleChangeTaskSearch(e) {
    setTasksSearch(e.target.value)
  }

  function deleteCompletedTasks() {
    const remainingTasks = tasks.filter(task => !task.completed)
    setTasks(remainingTasks)
  }

  const filterTasks = tasks.filter(task => task.name.toLowerCase().indexOf(tasksSearch.toLowerCase()) > -1)
  filterTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

  const taskList = filterTasks
    .map(task => (
      <Todo
        id={task.id}
        task={task}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        setEditingTask={setEditingTask}
      />
    ))

  const isDisplayBulkAction = filterTasks.some(task => task.completed)

  return (
    <div className="container"> <div className="todoapp stack-large">
      <h2 className="text-center">
        New Task
      </h2>
      <Form addTask={addTask} />
    </div>
      <div className="todoapp stack-large">
        <h2 className="text-center">
          To Do List
        </h2>
        <input
          type="text"
          className="input input__md"
          name="text"
          autoComplete="off"
          value={tasksSearch}
          onChange={handleChangeTaskSearch}
          placeholder="Search"
        />
        <ul
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>

        {isDisplayBulkAction && <div className="bulkAction">
          <label className="todo-label" htmlFor={props.id}>
            Bulk action
          </label>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn__info"
            // onClick={() => setEditingTask(task.id, isEditing)}
            >
              Done
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={deleteCompletedTasks}
            >
              Remove
            </button>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default App
