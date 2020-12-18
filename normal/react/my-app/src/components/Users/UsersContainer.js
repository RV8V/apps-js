import React from 'react'
import Users from './Users'
import { connect } from 'react-redux'
import { followActionCreator, unfollowActionCreator, setUserActionCreator } from '../../redux/users-reducer'

const mapStateToProps = state => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    follow: userId => {
      dispatch(followActionCreator(userId))
    },
    unfollow: userId => {
      dispatch(unfollowActionCreator(userId))
    },
    setUsers: users => {
      dispatch(setUserActionCreator(users))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
