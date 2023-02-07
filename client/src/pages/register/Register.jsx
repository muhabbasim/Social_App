import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'

function Register() {
  
  const navigate = useNavigate();

  const initialData = {
    username: '',
    email: '',
    password: '',
    name: '',
  }
  const [ inputs, setInputs ] = useState(initialData)
  const { username, email, password, name } = inputs

  const [ err, setErr ] = useState()
  
  const inputHandler = (e) => {
    const { name, value } = e.target 
    setInputs({...inputs, [name]: value})
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', inputs)
      console.log(res.data)
      navigate("/login");

    } catch (error) {
      setErr(error.response.data.message)
      console.log(err)
    }
  }


  return (
    <section className='register'>
      <div className="card">
        <div className="left">
          <h1>Social <br/> App.</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate molestiae architecto iure quam ipsum illo voluptates soluta tenetur? Soluta sapiente est reiciendis, neque</p>
          <span>Don you have an account?</span>
          <Link to="/login"><button>Login</button></Link>
        </div>
        <div className="right">
          <h1>Register</h1> 
          <form>
            <input type="text" placeholder="Username" name='username' value={username} onChange={inputHandler}/>
            <input type="email" placeholder="Email" name='email' value={email} onChange={inputHandler}/>
            <input type="password" placeholder="Password" name='password' value={password} onChange={inputHandler}/>
            <input type="text" placeholder="name" name='name' value={name} onChange={inputHandler}/>
            {err && <span className='err'>{err}</span>}
            <button className="login-btn" type='submit' onClick={handleRegister}>Register</button>
          </form>
        </div>
        
      </div>
    </section>
  )
}

export default Register