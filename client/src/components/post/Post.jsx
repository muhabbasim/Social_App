import React, { useContext, useState } from 'react'
import './Post.scss'
import { BsThreeDots } from 'react-icons/bs'
import { RiHeart3Line } from 'react-icons/ri'
import { RiHeart3Fill } from 'react-icons/ri'
import { BiCommentMinus } from 'react-icons/bi'
import { BiShareAlt } from 'react-icons/bi'
import Comment from '../comments/Comment'
import { Link } from 'react-router-dom'
import PostOptions from '../post_options/PostOptions'
import moment from 'moment'
import { makeRequest } from '../../axios.js'
import { useQuery } from 'react-query'

import {
  useMutation,
  useQueryClient,
} from 'react-query'
import { AuthContext } from '../../context/AuthContext'


function Post({ post }) { 

  const { currentUser } = useContext(AuthContext)
  const [ commentOpen, setCommentOpen ] = useState(false)
  const [ postOptions, setPostOptions ] = useState(false)

  // react query for fetching likes data
  const { isLoading, error, data } = useQuery(['likes', post.id], () =>
    makeRequest.get("/likes?post_id=" + post.id).then((res) => {
      return res.data;
    })
  )
  // console.log(post)

  const queryClient = useQueryClient()
  
  // react query function for sending data
  const mutation = useMutation((liked) => 
    {
      if(liked) return makeRequest.delete("/likes?post_id=" + post.id)
      return makeRequest.post('/likes', {post_id: post.id})
    }, 
    {
      onSuccess: () => {
      queryClient.invalidateQueries(['likes'])
    },
  })

  const handleLikes = (e) => {
    mutation.mutate(data.includes(currentUser.id))

  }

  return (
    <div className='post'>
      <div className="user">
        <div className="user-info">
          <Link to={`/profile/${post.user_id}`}><img src={post.img} alt="" /></Link>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <span>{post.name}</span>
            <span>{moment(post.created_at).fromNow()}</span>
          </div>
        </div>
        <BsThreeDots style={{ cursor: 'pointer'}} size={25} onClick={()=> 
          setPostOptions(!postOptions)}
        />
      </div>
      <div className="content">
        <span>{post.desc}</span>
        <img src={"./uploads/"+post.img} alt="" />
      </div>
      <div className="info">
        {isLoading ? "is loading..." : <div className="item">
          { data.includes(currentUser.id) 
            ? <RiHeart3Fill style={{color:"red"}} onClick={handleLikes}/> 
            : <RiHeart3Line onClick={handleLikes}/>}
          <span>{data.length}Likes</span>
        </div>}
        <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
          <BiCommentMinus/>
          <span>3 Comment</span>
        </div>
        <div className="item">
          <BiShareAlt/>
          <span>Share</span>
        </div>
      </div>
      { commentOpen && <Comment post_id={post.id}/>}
      <div className='post-option'>
        { postOptions && <PostOptions post={post} setPostOptions={setPostOptions}/>}
      </div>
    </div>
  )
}

export default Post