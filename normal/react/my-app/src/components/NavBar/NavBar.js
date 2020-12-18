import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='nav'>
      <div>
        <NavLink to='/profile'>Profile</NavLink>
      </div>
      <div>
        <NavLink to='/dialogs'>Messages</NavLink>
      </div>
      <div>
        <NavLink to='/users'>Users</NavLink>
      </div>
      <div>
        <a>News</a>
      </div>
      <div>
        <a>Music</a>
      </div>
      <div>
        <a>Settings</a>
      </div>
    </nav>
  )
}

export default NavBar
