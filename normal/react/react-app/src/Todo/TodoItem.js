import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../context'

export default function TodoItem(props) {
  const { removeTodo } = useContext(Context)
  const classes = []

  if (props.todo.completed)
    classes.push('done')

  return (
    <li>
      <span className={classes.join(' ')}>
        <input type='checkbox' checked={props.todo.completed} onChange={() => props.onChange(props.todo.id)} />
        <strong>{props.index}</strong>
        &nbsp;
        {props.todo.title}
      </span>
      &nbsp;
      <button onClick={removeTodo.bind(null, props.todo.id)}>&times;</button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired
}
