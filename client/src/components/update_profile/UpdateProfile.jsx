import React from 'react'
import { useState } from 'react'
import { makeRequest } from '../../axios'
import './UpdateProfile.scss'
import {
  useMutation,
  useQueryClient,
} from 'react-query'

function UpdateProfile({setOpenUpdate, user}) {

  const [ formData, setFormData ] = useState({
    name: user.name,
    city: user.city,
    website: user.website,
  }) 
  const [ cover, setCover ] = useState(null) 
  const [ profile, setProfile ] = useState(null) 

  // image upload function
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post('/upload', formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  // react query function
  const queryClient = useQueryClient()
  const mutation = useMutation((user) => 
    {
      return makeRequest.put('/users', user)
    }, 
    {
      onSuccess: () => {
      queryClient.invalidateQueries(["user"])
    },
  })

  // handle inpur change
  const handleFormChange = (e) => {
    setFormData((perv)=> ({...perv, [e.target.name]: [e.target.value]}))
  }
  
  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    let coverUrl = cover ? await upload(cover) : user.coverPic;
    let profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({...formData, coverPic: coverUrl, profilePic: profileUrl})
    setOpenUpdate(false)
  }

  return (
    <div className='update-profile'>
      <button onClick={()=> setOpenUpdate(false)}>X</button>
      <div className="update">
        <form>
          <input type="file" onChange={(e)=> setCover(e.target.files[0])}/>
          <input type="file" onChange={(e)=> setProfile(e.target.files[0])}/>
          <input type="text" name='name' onChange={handleFormChange}/>
          <input type="text" name='city' onChange={handleFormChange}/>
          <input type="text" name='website' onChange={handleFormChange}/>
        </form>
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default UpdateProfile