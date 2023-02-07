import React from 'react'
import Post from '../post/Post'
import './Posts.scss'
import { useQuery } from 'react-query'
import { makeRequest } from '../../axios.js'


function Posts({user_id}) {
  
  // react query
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('/posts?user_id='+ user_id).then((res) => {
      return res.data;
    })
  )
  // console.log(userId) 

  return (
    <div className='posts'>
      { error
        ? "Something went wrong"
        : isLoading 
        ? "Loading..."
        : data.map((post) => (
        <Post post={post} key={post.id}/>
      ))}
    </div>
  )
}

export default Posts