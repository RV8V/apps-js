const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
  if (action.type === UPDATE_NEW_MESSAGE_BODY) {
    return { ...state, newMessageBody: action.body }
  } else if (action.type === SEND_MESSAGE) {
    const body = state.newMessageBody
    return { ...state, newMessageBody: '', messageData_dialog: [...state.messageData_dialog, { id: '5', message: body }] }
  }

  return state
}

export default dialogsReducer
