import { db } from '../connect.js';
import jwt from 'jsonwebtoken'

// get user
export const getUser = (req, res) => {
  const userId = req.params.id
  const q = `SELECT * FROM users WHERE id = ?`;

  db.query( q,[userId], (err, data) => {
    if (err) return res.status(500).json({ error: err })
    const { password, ...info } = data[0]
    res.status(200).json(info)
  })

}

//update user
export const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if(!token) return res.status(401).json({message:'Not authenticated'});

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json({message: "Invalid token"});

    const q = "UPDATE users SET `name`=?, `coverPic`=?, `profilePic`=?, `city`=?, `website`=? WHERE id = ?";

    db.query( q, [
      req.body.name,
      req.body.coverPic,
      req.body.profilePic,
      req.body.city,
      req.body.website,
      userInfo.id
    ], (err, data) => {
      if (err) return res.status(500).json({ error: err })
      if (data.affectedRows > 0) return res.json('profile updated')
      res.status(403).json('You can only update your profile')
    })

  });
}
