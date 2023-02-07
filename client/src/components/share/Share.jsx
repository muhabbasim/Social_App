import React, { useState } from 'react'
import './Share.scss'
import { Link } from 'react-router-dom'
import Img from '../../assets/images/img.png'
import Place from '../../assets/images/place.png'
import Tag from '../../assets/images/tag.png'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

import {
  useMutation,
  useQueryClient,
} from 'react-query'
import { makeRequest } from '../../axios'

function Share() {

  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext)

  const [ file, setFile ] = useState(null)
  const [ desc, setDesc ] = useState("")

  // image upload function
  const upload = async () => {
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
  const mutation = useMutation((newPost) => 
    {
      return makeRequest.post('/posts', newPost)
    }, 
    {
      onSuccess: () => {
      queryClient.invalidateQueries('posts')
    },
  })

  // share handler
  const handleShare = async (e) => {
    e.preventDefault()

    let imgUrl = ""
    if(file) imgUrl = await upload();
    mutation.mutate({desc, img: imgUrl})
    
    setDesc("");
    setFile(null);
  }

  return (
    <div className='share'>
      <div className="write">

        <div className="user">
          <div className="user-info">
            <img src={currentUser.profilePic} alt="" />
          </div>
        </div>
        <div className="content">
          <textarea 
            onChange={(e)=> setDesc(e.target.value)}
            placeholder='Whats on you mind?' 
            name='desc' cols="10" rows="3" value={desc}>
          </textarea>
        </div>
        <div className="file">
          { file && <img className='file-img' src={URL.createObjectURL(file)} alt="" />}
        </div>
      </div>

      <div className="upload">

        <div className="info">
          <div className="item" >
            <input type="file" id='file' 
              style={{display: "none"}}
              onChange={(e)=> setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <img src={Img} alt="" />
              <span>Add Image</span>
            </label>
          </div>
          <div className="item" >
            <img src={Place} alt="" />
            <span>Add Place</span>
          </div>
          <div className="item">
            <img src={Tag} alt="" />
            <span>Tag Friend</span>
          </div>
        </div>
        <button className='share-btn' 
          onClick={handleShare}
        >Share</button>
      </div>
      
    </div>
  )
}

export default Share