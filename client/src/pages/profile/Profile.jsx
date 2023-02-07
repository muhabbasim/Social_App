import React, { useState } from 'react'
import './Profile.scss'
import { BsFacebook } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'
import { BsPinterest } from 'react-icons/bs'
import { BsEnvelope } from 'react-icons/bs'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { MdWebAsset } from 'react-icons/md'
import Posts from '../../components/posts/Posts'
import { makeRequest } from '../../axios.js'
import { useQuery} from 'react-query'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {
  useMutation,
  useQueryClient,
} from 'react-query'
import UpdateProfile from '../../components/update_profile/UpdateProfile'

function Profile() {

  const {currentUser} = useContext(AuthContext)
  const userId = parseInt(useLocation().pathname.split('/')[2])

  const [ openUpdate , setOpenUpdate ] = useState(false)

  // react query for fetching user data
  const { isLoading, data } = useQuery(['user'], () =>
    makeRequest.get(`/users/find/${userId}`).then((res) => {
      return res.data;
    })
  )
  // console.log( typeof userId)
  // console.log(typeof currentUser.id)

  // react query for fetching  relationship data
  const { isLoading: IsLoadingRelations, data: relationshipsData } = useQuery(['relationships'], () =>
    makeRequest.get("/relationships?followed_user_id=" + userId).then((res) => {
      return res.data;
    })
  )

  const queryClient = useQueryClient()
  
  // react query function for sending relationship data
  const mutation = useMutation((followed) => 
    {
      if(followed) return makeRequest.delete("/relationships?followed_user_id=" + userId)
      return makeRequest.post('/relationships', {followed_user_id:userId})
    }, 
    {
      onSuccess: () => {
      queryClient.invalidateQueries(['relationships'])
    },
  })

  const handleFollow = () => {
    mutation.mutate(relationshipsData.includes(currentUser.id))
  }


  return (
    <>
      { isLoading
      ? "is loading..."
      :
        <div className='profile'>
          <div className="images">
            <img className='cover' src={"/uploads/"+data.coverPic} alt="" />
            <img className='profilePic' src={"/uploads/"+data.profilePic} alt="" />
          </div>
          <div className="profile-container">
            <div className="user-info">
              <div className="left">
                <BsFacebook color='gray' size={20}/>
                <FaInstagram color='gray' size={20}/>
                <BsTwitter color='gray' size={20}/>
                <BsLinkedin color='gray' size={20}/>
                <BsPinterest color='gray' size={20}/>
              </div>
                <div className="center">
                  <span>{data?.name}</span>
                  <div className="info">
                    <div className="item">
                      <MdLocationOn color='gray'/>
                      <span>{data?.city}</span>
                    </div>
                    <div className="item">
                      <MdWebAsset color='gray'/>
                      <span>{data?.website}</span>
                    </div>
                  </div>
                  {IsLoadingRelations 
                    ? "Loading..." 
                    : userId === currentUser.id
                    ? <button onClick={(e)=> setOpenUpdate(true)}>Update</button>
                    : <button onClick={handleFollow}> {relationshipsData.includes(currentUser.id) ? "Following" : "Follow"} </button>
                  }
                </div>
                <div className="right">
                <BsEnvelope color='gray' size={25}/>
                <BsThreeDotsVertical color='gray' size={25}/>
              </div>
            </div>
          </div>
          <div className='posts'>
            <Posts user_id={userId}/>
          </div>
          {openUpdate && <UpdateProfile user={data} setOpenUpdate={setOpenUpdate}/>}
        </div>
      }
    </>
  )
}

export default Profile