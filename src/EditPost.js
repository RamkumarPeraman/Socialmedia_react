import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPost = ({posts,setEditBody,setEditTitle,editBody,editTitle,handleEdit}) => {
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id)
    useEffect(() =>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post,setEditBody,setEditTitle])
    
  return (
    <div className="NewPost">
        {editTitle && 
        <>
        <form action="" className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="">Title:</label>
            <input 
                type="text"
                id="postTitle"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)} 
            />
            <label htmlFor="">Body:</label>
            <textarea 
                id="postBody"
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)} 
                cols="30"
                rows="10" 
            />
            <button
                type='button'
                onClick={() => handleEdit(post.id)}
            >
                Submit
            </button>
        </form>
        </>
        }
        {!editTitle &&
        <p>Loading...</p>
        }
    </div>
  )
}

export default EditPost