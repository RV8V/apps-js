const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const initialState = {
  messageData: [
    { id: '1', message: 'hi, how are you' },
    { id: '2', message: 'it is my first post' }
  ],
  newPostText: 'hello, world'
}

const profileReducer = (state = initialState, action) => {
  if (action.type === ADD_POST) {
    const stateCopy = { ...state }
    stateCopy.messageData = [...state.messageData]
    stateCopy.messageData.push({ id: '4', message: state.newPostText })
    stateCopy.newPostText = ''
    return stateCopy
  } else if (action.type === UPDATE_NEW_POST_TEXT) {
    const stateCopy = { ...state }
    stateCopy.newPostText = action.postMessage
    return stateCopy
  }

  return state
}

export default profileReducer
