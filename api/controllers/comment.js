import { db } from '../connect.js';
import jwt from 'jsonwebtoken'
import moment from 'moment';

// get comments
export const getComments = (req, res) => {
  
  const q = `SELECT c.*, u.id AS user_id, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.user_id)
    WHERE c.post_id = ? ORDER BY c.created_at DESC
  `;

  db.query( q,[req.query.postId], (err, data) => {
    if (err) return res.status(500).json({ error: err })
    res.status(200).json(data)
  })
}

// add comments
export const addComments = (req, res) => {
  
  const token = req.cookies.access_token;
  if(!token) return res.status(401).json({message:'Not logged in'});

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json({message: "Invalid token"});

    const q = "INSERT INTO comments (`desc`, `created_at`, `user_id`, `post_id`) VALUES (?)";
    
    const values = [
      req.body.desc,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      userInfo.id,
      req.body.post_id,
    ];
    
    db.query( q, [values], (err, data) => {
      if (err) return res.status(500).json({ error: err })
      res.status(200).json({ message:"comment hsa been created" })
    })

  })


}