import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Login.scss'

function Login() {


  const { login } = useContext(AuthContext)
  
  const [ inputs, setInputs ] = useState({
    username: "",
    password: "",
  })
  
  const [ err, setErr ] = useState(null)

  const navigate = useNavigate()

  const { username, password } = inputs
  const inputHandler = (e) => {
    const { name, value } = e.target
    setInputs({...inputs, [name]: value});
  }

  const hanldeLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/")
    } catch (err) {
      setErr(err.response.data);
    }
  }
  
  return (
    <section className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello <br/> World.</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate molestiae architecto iure quam ipsum illo voluptates soluta tenetur? Soluta sapiente est reiciendis, neque</p>
          <span>Don't you have an account?</span>
          <Link to="/register"><button>Register</button></Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" value={username} name="username" onChange={inputHandler}/>
            <input type="password" placeholder="Password" value={password} name="password" onChange={inputHandler}/>
            {err && <span className='err'>{err}</span>}
            <button className="login-btn"
              onClick={hanldeLogin}
            >Login</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login