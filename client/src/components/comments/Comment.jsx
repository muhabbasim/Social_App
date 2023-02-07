import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Comment.scss'
import { useQuery } from 'react-query'
import { makeRequest } from '../../axios.js'
import moment from 'moment'


import {
  useMutation,
  useQueryClient,
} from 'react-query'
import { Link } from 'react-router-dom'


function Comment({post_id}) {
  
  const {currentUser} =useContext(AuthContext)

 // react query for fetching data
  const { isLoading, error, data } = useQuery(['comments'], () =>
    makeRequest.get("/comments?postId=" + post_id).then((res) => {
      return res.data;
    })
  )
  // console.log(data)
  
  const queryClient = useQueryClient()

  const [ desc, setDesc ] = useState("")
  
  // react query function for sending data
  const mutation = useMutation((newComment) => 
    {
      return makeRequest.post('/comments', newComment)
    }, 
    {
      onSuccess: () => {
      queryClient.invalidateQueries(['comments'])
    },
  })

  const handleSend = (e) => {
    e.preventDefault()
    mutation.mutate({desc, post_id})
    setDesc("");
  }

  return (
    <div className='comments'>
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text"  placeholder='Write a comment' value={desc}
          onChange={(e)=> setDesc(e.target.value)}  
        />
        <button onClick={handleSend}>Send</button>
      </div>

      { error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((comment)=> {
          return (
            <div className="comment" key={comment.id}>
              <Link to={`/profile/${comment.user_id}`}><img src={comment.profilePic} alt="" /></Link>
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className='date'>{moment(comment.create_at).fromNow()}</span>
            </div>
          )
        })}
    </div>
  )
}

export default Comment