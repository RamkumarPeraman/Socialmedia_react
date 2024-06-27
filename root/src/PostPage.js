import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({posts,handleDelete}) => {
  const {id} = useParams('');
  const post = posts.find(post => (post.id).toString()===id)
  return (
      <main className='PostPage'>
        <article className='post'>
          {post &&
            <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>

            <Link to={`/edit/${post.id}`}>
                <button 
                type='button'
                >
                  Edit
                </button>
            </Link>
            <button
            type='button'
            onClick={() => handleDelete(post.id)}
            >
              delete
            </button>
            </>
          }
          {!post &&
            <>
            <h2>Page is not found</h2>
            <Link to= "/">visit Home page</Link>
            </>
          }
        </article>
      </main>
  )
}

export default PostPage