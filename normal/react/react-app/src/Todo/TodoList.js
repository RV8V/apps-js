import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

export default function TodoList(props) {
  return (
    <ul>
      {props.todos.map((todo, index) => {
        return <TodoItem todo={todo} index={index + 1} onChange={props.onToggle} key={todo.id} />
      })}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired
}
