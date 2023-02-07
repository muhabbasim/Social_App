import React, { useContext } from 'react'
import './NavBar.scss'
import { AiOutlineHome } from 'react-icons/ai'
import { BsMoon } from 'react-icons/bs'
import { RiApps2Line } from 'react-icons/ri'
import { BiSearch } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { RxEnvelopeClosed } from 'react-icons/rx'
import { FaRegBell } from 'react-icons/fa'
import { RiSunFill } from 'react-icons/ri'
import { DarkModeContext } from '../../context/DarkModeContext'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


function NavBar() {
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useContext(DarkModeContext)
  const { currentUser, logout } = useContext(AuthContext)
  const { name, profilePic, id } = currentUser
    
  const handleLogout = (e) => {
    e.preventDefault();

    try {
     const res = logout()
      navigate("/login");
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='navbar'>
      <div className="left">
        <Link className='--link' to="/">
          <h2>Social App</h2>
        </Link>
        <div className="left_icons">
          <AiOutlineHome/>
          { darkMode 
          ? <RiSunFill onClick={toggleTheme} style={{cursor: 'pointer'}}/>
          : <BsMoon onClick={toggleTheme} style={{cursor: 'pointer'}}/>}
          <RiApps2Line/>
          <div className="search">
            <BiSearch/>
            <input type="search" placeholder='Search' />
          </div>
        </div>
      </div>
      <div className="right">
        <FaUserAlt/>
        <RxEnvelopeClosed/>
        <FaRegBell/>
        <Link className='--link' to={`/profile/${currentUser.id}`}>
          <div className="user_name">
            <img src={"/uploads/"+profilePic} alt="" />
            <span>{name}</span>
          </div>
        </Link>
        <button className='logout' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default NavBar