import React, { useContext } from 'react'
import './LeftBar.scss'
import friends from '../../assets/images/friends.png'
import message from '../../assets/images/email.png'
import watch from '../../assets/images/facebook.png'
import gaming from '../../assets/images/game-controller.png'
import group from '../../assets/images/group.png'
import gallery from '../../assets/images/image-gallery.png'
import marketplace from '../../assets/images/marketplace.png'
import events from '../../assets/images/schedule.png'
import memories from '../../assets/images/stop-watch.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function LeftBar() {

  const {currentUser} = useContext(AuthContext)
  
  return (
    <div className="left-bar">
    <div className='container'>
      <div className="menu">
        <Link className='--link' to={`/profile/${currentUser.id}`}>
          <div className="user">
            <img src={"/uploads/"+currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
        </Link>
        <div className="item">
          <img src={friends} alt="" />
          <span>Friends</span>
        </div>
        <div className="item">
          <img src={group} alt="" />
          <span>Group</span>
        </div>
        <div className="item">
          <img src={marketplace} alt="" />
          <span>Marketplace</span>
        </div>
      </div>
      <hr />
      <div className="menu">
        <span>Your Shortcuts</span>
        <div className="item">
          <img src={watch} alt="" />
          <span>Watch</span>
        </div>
        <div className="item">
          <img src={memories} alt="" />
          <span>Memories</span>
        </div>
        <div className="item">
          <img src={events} alt="" />
          <span>Events</span>
        </div>
      </div>
      <hr />
      <div className="menu">
        <span>Others</span>
        <div className="item">
          <img src={gaming} alt="" />
          <span>Camimg</span>
        </div>
        <div className="item">
          <img src={gallery} alt="" />
          <span>Gallery</span>
        </div>
        <div className="item">
          <img src={message} alt="" />
          <span>Message</span>
        </div>
      </div>

    </div>

    </div>
  )
}

export default LeftBar