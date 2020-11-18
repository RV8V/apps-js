import React from 'react'
import axios from 'axios'

const _Users = props => {
  const getUsers = () => {
    if (props.users.length === 0) {
      axios
        .get('http://social-network.com/api/1.0/users')
        .then(res => console.log(res))

      props.setUsers([
        { id: '1', followed: false, fullname: 'Bob', status: 'man', location: { city: 'minsk', country: 'belarus' } },
        { id: '2', followed: true, fullname: 'John', status: 'student', location: { city: 'kiev', country: 'ukraine' } },
      ])
    }
}
  return (
    <div>
      <button onClick={getUsers}>get users</button>
      {props.users.map(user => <div>
        <span>
          <div>
            { user.followed
              ? <button onClick={() => props.unfollow(user.id)}>unfollow</button>
              : <button onClick={() => props.follow(user.id)}>follow</button> }
          </div>
        </span>
        <span>
          <span>
            <div>{user.fullname}</div>
            <div>{user.status}</div>
          </span>
          <span>
            <div>{user.location.city}</div>
            <div>{user.location.country}</div>
          </span>
        </span>
      </div>)
    }
    </div>
  )
}

class Users extends React.Component {
  constructor(props) {
    super(props)
      /*
      axios
        .get('http://social-network.com/api/1.0/users')
        .then(res => console.log(res))

      this.props.setUsers([
        { id: '1', followed: false, fullname: 'Bob', status: 'man', location: { city: 'minsk', country: 'belarus' } },
        { id: '2', followed: true, fullname: 'John', status: 'student', location: { city: 'kiev', country: 'ukraine' } },
      ])
      */
  }

  componentDidMount() {
    /*
    axios
      .get('http://social-network.com/api/1.0/users')
      .then(res => console.log(res))

    this.props.setUsers([
      { id: '1', followed: false, fullname: 'Bob', status: 'man', location: { city: 'minsk', country: 'belarus' } },
      { id: '2', followed: true, fullname: 'John', status: 'student', location: { city: 'kiev', country: 'ukraine' } },
    ])
    */
  }

  getUsers = () => {
    if (this.props.users.length === 0) {
      axios
        .get('http://social-network.com/api/1.0/users?page='
        + this.props.currentPage
        + '&count='
        + this.props.pageSize)
        .then(console.log)

      this.props.setUsers([
        { id: '1', followed: false, fullname: 'Bob', status: 'man', location: { city: 'minsk', country: 'belarus' } },
        { id: '2', followed: true, fullname: 'John', status: 'student', location: { city: 'kiev', country: 'ukraine' } },
      ])
    }
  }

  render() {
    const pagesCount = this.props.totalUsersCount / this.props.pageSize
    const pages = []
    for (let i = 1; i <= pagesCount; ++i)
      pages.push(i)

    return (
      <div>
      <div>
        {pages.map(p => {
          return <span className={this.props.currentPage === p && true}>{p}</span>
        })}
      </div>
      {/*  <button onClick={this.getUsers}>get users</button> */}
        {this.props.users.map(user => <div>
          <span>
            <div>
              { user.followed
                ? <button onClick={() => this.props.unfollow(user.id)}>unfollow</button>
                : <button onClick={() => this.props.follow(user.id)}>follow</button> }
            </div>
          </span>
          <span>
            <span>
              <div>{user.fullname}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{user.location.city}</div>
              <div>{user.location.country}</div>
            </span>
          </span>
        </div>)
      }
      </div>
    )
  }
}

export default Users
