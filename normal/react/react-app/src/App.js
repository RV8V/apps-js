import React, { useEffect } from 'react'
import './App.css';
import TodoList from './Todo/TodoList'
import AddTodo from './Todo/AddTodo'
import Loader from './Loader'
import { Context } from './context'

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => console.log(res))
      .then(todos => {
        setTimeout(() => {
          setTodos(todos || [{ id: 1, completed: false }])
          setLoading(false)
        }, 2000)
      })
      .catch(err => console.log(err))
  }, [])

  function toggleTodo(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id)
        todo.completed = !todo.completed
      return todo
    }))
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className='wrapper'>
        <h1>react todolist example</h1>
        <AddTodo onCreate={ addTodo } />
        { loading && <Loader /> }
        { todos.length && <TodoList todos={todos} onToggle={toggleTodo} /> }
      </div>
    </Context.Provider>
  )
}

export default App;
