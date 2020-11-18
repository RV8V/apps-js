import React from 'react'
import Post from './Post/Post'
import MyPosts from './MyPosts'
import StoreContext from '../../../StoreContext'
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/state'
import { connect } from 'react-redux'

const _MyPostsContainer = (props) => {
  return (
    <StoreContext.Consumer>
    { store => {
        const state = store.getState()

        const addPost = () => {
          store.dispatch(addPostActionCreator())
        }

        const onPostChange = message => {
          store.dispatch(updateNewPostTextActionCreator(message))
        }

        return <MyPosts
          updateNewPostText={onPostChange}
          addPost={addPost}
          messageData={state.profilePage.messageData}
          newPostText={state.profilePage.newPostText} />
      }
    }
    </StoreContext.Consumer>
  )
}

const mapStateToProps = state => {
  return {
    messageData: state.profilePage.messageData,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateNewPostText: message => {
      dispatch(updateNewPostTextActionCreator(message))
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
