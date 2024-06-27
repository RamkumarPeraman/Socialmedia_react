import React from 'react'

const NewPost = ({
  handleSubmit,postBody,postTitle,setPostBody,setPostTitle
}) => {
  return (
    <main className='NewPost'>
      <h1>New Post</h1>
      <form className='newPostForm ' onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
            id='postTitle'
            type="text"
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)} 
        />
        <label htmlFor="postBody">Body:</label>
        <textarea 
            name="postBody" 
            id="" 
            cols="30" 
            rows="10"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            />
            <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost