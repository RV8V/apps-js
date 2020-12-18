const UNFOLLOW = 'UNFOLLOW'
const FOLLOW = 'FOLLOW'
const SET_USERS = 'SET-USERS'

const initialState = {
  users: [
    /*{ id: '1', followed: false, fullname: 'Bob', status: 'man', location: { city: 'minsk', country: 'belarus' } },
    { id: '2', followed: true, fullname: 'John', status: 'student', location: { city: 'kiev', country: 'ukraine' } },
  */],
  pageSize: 2,
  totalUsersCount: 20,
  currentPage: 1
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
        if (user.id === action.userId) {
          return { ...user, followed: true }
        }
        return user
      })
    }
      break;
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
        if (user.id === action.userId) {
          return { ...user, followed: false }
        }
        return user
      })
    }
      break;
    case SET_USERS:
      return { ...state, users: [...state.users, ...action.users] }
      break;
    default: return state
  }
}

export const followActionCreator = userId => {
  return { type: 'FOLLOW', userId }
}

export const unfollowActionCreator = userId => {
  return { type: 'UNFOLLOW', userId }
}

export const setUserActionCreator = users => {
  return { type: 'SET-USERS', users }
}

export default usersReducer
