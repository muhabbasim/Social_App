import React, { useContext } from 'react'
import './PostOptions.scss'
import {HiOutlineUserAdd} from 'react-icons/hi'
import {MdFavoriteBorder} from 'react-icons/md'
import {BiVolumeMute} from 'react-icons/bi'
import {AiOutlineDelete} from 'react-icons/ai'
import {BiBlock} from 'react-icons/bi'
import {RiFlag2Line} from 'react-icons/ri'
import { AuthContext } from '../../context/AuthContext'
import {
  useMutation,
  useQueryClient,
} from 'react-query'
import { makeRequest } from '../../axios'



function PostOptions({ setPostOptions, post }) {
  
  const { currentUser } = useContext(AuthContext)
  const closeOptions = () => {
    setPostOptions(false)
  }

  const queryClient = useQueryClient()
  
  // react query function for deleting post
  const mutation = useMutation((postId) => 
    {
      return makeRequest.delete("/posts?id=" + postId)
    }, 
    {
      onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    },
  })

  const deletePost = () => {
    mutation.mutate(post.id)
    setPostOptions(false)
  }

  return (
    <div className='post-options'>
      { post.user_id === currentUser.id && <div className="item" onClick={deletePost}>
        <span>Delete post</span>
        <AiOutlineDelete/>
      </div>}
      <hr />
      <div className="item" onClick={closeOptions}>
        <span>Flolow @{currentUser.name}</span>
        <HiOutlineUserAdd/>
      </div>
      <hr />
      <div className="item" onClick={closeOptions}>
        <span>Add to favorite</span>
        <MdFavoriteBorder/>
      </div>
      <hr />

      <div className="item" onClick={closeOptions}>
        <span>Mute @{currentUser.name}</span>
        <BiVolumeMute/>
      </div>
      <hr />

      <div className="item" onClick={closeOptions}>
        <span>Block @{currentUser.name}</span>
        <BiBlock/>
      </div>
      <hr />

      <div className="item" onClick={closeOptions}>
        <span>Report on @{currentUser.name}</span>
        <RiFlag2Line/>
      </div>
      
    </div>
  )
}

export default PostOptions