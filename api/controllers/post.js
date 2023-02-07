import { db } from '../connect.js';
import jwt from 'jsonwebtoken'
import moment from 'moment';


// get posts
export const getPosts = (req, res) => {

  const user_id = req.query.user_id

  const token = req.cookies.access_token;
  if(!token) return res.status(401).json({message:'Not logged in'});

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json({message: "Invalid token"});

    const q = user_id !== "undefined"
      ? `SELECT p.*, u.id AS user_id, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.user_id) WHERE p.user_id = ? ORDER BY p.created_at DESC` 
      : `SELECT p.*, u.id AS user_id, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.user_id)
        LEFT JOIN relationships AS r ON (p.user_id = r.followed_user_id) WHERE r.follower_user_id = ? OR p.user_id = ?
        ORDER BY p.created_at DESC`;
    
    const values = user_id !== "undefined" ? [user_id] : [userInfo.id, userInfo.id];
    db.query( q, values, (err, data) => {
      if (err) return res.status(500).json({ error: err })
      res.status(200).json(data)
    })

  })

}

// add post
export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if(!token) return res.status(401).json({message:'Not logged in'});

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json({message: "Invalid token"});

    const q = "INSERT INTO posts (`desc`, `img`, `created_at`, `user_id`) VALUES (?)";
    
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      userInfo.id
    ];
    
    db.query( q, [values], (err, data) => {
      if (err) return res.status(500).json({ error: err })
      res.status(200).json({ message:"post hsa been created" })
    })

  })

}

// delete post
export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if(!token) return res.status(401).json({message:'Not logged in'});

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json({message: "Invalid token"});

    const q = "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?";
    
    db.query( q, [req.query.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json({ error: err })
      if (data.affectedRows > 0) return res.status(200).json({ message:"post hsa been deleted" })
      res.status(403).json({ message:"You can only delete your posts" })
    })

  })

}
