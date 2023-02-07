import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Stories.scss'

function Stories() {
  const { currentUser } = useContext(AuthContext)

  const stories = [
    {
      id: 1,
      name: 'Anass thani',
      img: "https://images.unsplash.com/photo-1612397790470-9601b28ed84f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 2,
      name: 'Rolla Rani',
      img: "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80"
    },
    {
      id: 3,
      name: 'Nuha Issa',
      img: "https://images.unsplash.com/photo-1588578929512-82de8ae1e8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 4,
      name: 'Somalia',
      img: "https://images.unsplash.com/photo-1592771385918-90eeffa48baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
    },
    {
      id: 5,
      name: 'Cthe god',
      img: "https://images.unsplash.com/photo-1642757151456-1b7c3977641a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    }
  ]

  return (
    <div className='stories'>
      <div className='story'>
        <img src={"/uploads/"+currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map(story => (
        <div className='story' key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories