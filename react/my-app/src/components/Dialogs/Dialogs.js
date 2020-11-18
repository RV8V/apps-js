import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { updateNewMessageBodyActionCreator, sendMessageActionCreator } from '../../redux/state'

const Dialogs = (props) => {
  const state = props.dialogsPage

  const dialogElements = state.dialogsData.map(({ name, id }) => <DialogItem name={name} id={id}/>)
  const messageElements = state.messageData_dialog.map(({ message }) => <Message message={message}/>)
  const newMessageBody = state.newMessageBody

  const onSendMessageClick = () => {
    props.sendMessage()
    //props.store.dispatch(sendMessageActionCreator())
  }

  const onNewMessageChange = (event) => {
    const body = event.target.value
    props.updateNewMessageBody(body)
    //props.store.dispatch(updateNewMessageBodyActionCreator(body))
  }

  return (
    <div className='dialogs'>
      <div className='dialogs-items'>
        { dialogElements }
      </div>
      <div className='messages'>
        <div>{ messageElements }</div>
        <div>
          <div><textarea value={newMessageBody} onChange={onNewMessageChange} placeholder>enter your message</textarea></div>
          <div><button onClick={onSendMessageClick}>send</button></div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
