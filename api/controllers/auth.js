import { db } from '../connect.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// register
export const register = (req, res) => {

  const { username, name, email, password } = req.body
  if (!username || !name || !email || !password) {
    return res.status(400).json({message:'Please provide values for inputs'})
  }
  
  // chedk if there is already a user
  const q = 'SELECT * FROM users WHERE username = ? Or email = ?'
  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.status(500).json({ error: err })
    if (data.length) return res.status(409).json({message: 'User already exists'})
    
    // create user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)"
    const values = [req.body.username, req.body.email, hashedPassword, req.body.name];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json({ error: err })
      return res.status(200).json({message: 'User has been created'})
    })
    
  })
  
}

// login
export const login = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({message: 'Please provide values for inputs'})
  }

  const q = 'SELECT * FROM users WHERE username = ?'
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ error: err })
    if(data.length === 0) return res.status(404).json({message: 'User not found'})

    const checkedPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkedPassword) return res.status(400).json({message: 'Wrong data inputs'})

    const token = jwt.sign({id: data[0].id}, 'secretkey')
    const { password, ...others } = data[0];

    res.cookie('access_token', token, {
      httpOnly: true,
    }).status(200).json(others);

  })
}

// logout
export const logout = (req, res) => {
  res.clearCookie('access_token', {
    secure: true,
    sameSite: 'none' 
  }).status(200).json({message: 'User has been logged out'});

}

