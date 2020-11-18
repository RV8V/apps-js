import React from 'react'
import Post from './Post/Post'
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/state'

const MyPosts = (props) => {
  const messageElements = props.messageData.map(({ message }) => <Post message={message} />)
  const newPostElement = React.createRef()

  const onAddPost = () => {
    props.addPost()
    //props.dispatch(addPostActionCreator())
  }

  const onPostChange = message => {
    const change = newPostElement.current.value
    props.updateNewPostText(change)
    //props.dispatch(updateNewPostTextActionCreator(change))
  }

  return (
    <div>
      <h3>my posts</h3>

      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}></textarea>
        </div>
        <div>
          <button onClick={onAddPost}>add post</button>
        </div>
      </div>

      <div>
        {messageElements}
      </div>
    </div>
  )
}

export default MyPosts
