import React from 'react'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import Dialogs from './Dialogs'
import StoreContext from '../../StoreContext'
import { updateNewMessageBodyActionCreator, sendMessageActionCreator } from '../../redux/state'
import { connect } from 'react-redux'

const _DialogsContainer = (props) => {
  return (
    <StoreContext.Consumer>
    { store => {
        const state = store.getState().dialogsPage

        const onSendMessageClick = () => {
          store.dispatch(sendMessageActionCreator())
        }

        const onNewMessageChange = (body) => {
          store.dispatch(updateNewMessageBodyActionCreator(body))
        }

        return <Dialogs
          newMessageBody={onNewMessageChange}
          sendMessage={onSendMessageClick}
          dialogsPage={state} />
      }
    }
    </StoreContext.Consumer>
  )
}

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyActionCreator(body))
    },
    sendMessage: () => {
      dispatch(sendMessageActionCreator())
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
