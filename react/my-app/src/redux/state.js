import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

const store = {
  _state: {
    profilePage: {
      messageData: [
        { id: '1', message: 'hi, how are you' },
        { id: '2', message: 'it is my first post' }
      ],
      newPostText: 'hello, world'
    },
    dialogsPage: {
      dialogsData: [
        { id: '1', name: 'Bob' },
        { id: '1', name: 'John' }
      ],
      messageData_dialog: [
        { id: '1', message: 'hello' },
        { id: '2', message: 'how are you' },
        { id: '3', message: 'good' }
      ],
      newMessageBody: ''
    },
    sidebar: {}
  },

  getState() {
    return this._state
  },

  rerenderEntireTree() {
    console.log('state changed')
  },

  _addPost() {
    this._state.profilePage.messageData.push({ id: '4', message: this._state.profilePage.newPostText })
    this._state.profilePage.newPostText = ''
    this._rerenderEntireTree(this._state)
  },

  _updateNewPostText(postMessage) {
    this._state.profilePage.newPostText = postMessage
    this._rerenderEntireTree(this._state)
  },

  subscribe(observer) {
    console.log('change rerenderEntireTree')
    this._rerenderEntireTree = observer
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)
    this._rerenderEntireTree(this._state)
  }
}

export const addPostActionCreator = () => {
  return { type: ADD_POST }
}

export const updateNewPostTextActionCreator = message => {
  return { type: UPDATE_NEW_POST_TEXT, postMessage: message }
}

export const sendMessageActionCreator = () => {
  return { type: SEND_MESSAGE }
}

export const updateNewMessageBodyActionCreator = body => {
  return { type: UPDATE_NEW_MESSAGE_BODY, body: body }
}

window.store = store
export default store
