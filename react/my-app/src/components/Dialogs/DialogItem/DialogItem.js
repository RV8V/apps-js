import React from 'react'
import { NavLink } from 'react-router-dom'

const DialogItem = ({ name, id }) => {
  return (
    <div className='dialog'>
      <NavLink to={'/dialogs/' + id}>{name}</NavLink>
    </div>
  )
}

export default DialogItem
