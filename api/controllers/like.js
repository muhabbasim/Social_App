import { db } from '../connect.js';
import jwt from 'jsonwebtoken'


// get likes
export const getLikes = (req, res) => {
  
  const q = `SELECT user_id FROM likes WHERE post_id = ?
  `;

  db.query( q,[req.query.post_id], (err, data) => {
    if (err) return res.status(500).json({ error: err })
    res.status(200).json(data.map(like => like.user_id))
  })

}

// add likes
export const addLike = (req, res) => {
  
  const token = req.cookies.access_token;
  if(!token) return res.status(401).json({message:'Not logged in'});

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json({message: "Invalid token"});

    const q = "INSERT INTO likes (`user_id`, `post_id`) VALUES (?)";
    
    const values = [
      userInfo.id,
      req.body.post_id,
    ];
    
    db.query( q, [values], (err, data) => {
      if (err) return res.status(500).json({ error: err })
      res.status(200).json({ message:"like hsa been created" })
    })

  })

}

// remove like
export const removeLike = (req, res) => {
  
  const token = req.cookies.access_token;
  if(!token) return res.status(401).json({message:'Not logged in'});

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json({message: "Invalid token"});

    const q = "DELETE FROM likes WHERE `user_id` = ? AND `post_id` = ?";
    
    db.query( q, [userInfo.id, req.query.post_id], (err, data) => {
      if (err) return res.status(500).json({ error: err })
      res.status(200).json({ message:"Post hsa been disliked" })
    })

  })

}