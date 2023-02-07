import { db } from '../connect.js';
import jwt from 'jsonwebtoken'


// get relationship
export const getRelationship = (req, res) => {
  
  const q = `SELECT follower_user_id FROM relationships WHERE followed_user_id = ?`;

  db.query( q,[req.query.followed_user_id], (err, data) => {
    if (err) return res.status(500).json({ error: err })
    res.status(200).json(data.map(relationship => relationship.follower_user_id))
  })

}

// add relationship
export const addRelationship = (req, res) => {
  
  const token = req.cookies.access_token;
  if(!token) return res.status(401).json({message:'Not logged in'});

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json({message: "Invalid token"});

    const q = "INSERT INTO relationships (`follower_user_id`, `followed_user_id`) VALUES (?)";
    
    const values = [
      userInfo.id,
      req.body.followed_user_id,
    ];
    
    db.query( q, [values], (err, data) => {
      if (err) return res.status(500).json({ error: err })
      res.status(200).json({ message:"you have followed this successfully" })
    })

  })

}

// remove relationship
export const removeRelationship = (req, res) => {
  
  const token = req.cookies.access_token;
  if(!token) return res.status(401).json({message:'Not logged in'});

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(401).json({message: "Invalid token"});

    const q = "DELETE FROM relationships WHERE `follower_user_id` = ? AND `followed_user_id` = ?";
    
    db.query( q, [userInfo.id, req.query.followed_user_id], (err, data) => {
      if (err) return res.status(500).json({ error: err })
      res.status(200).json({ message:" you have unfollowed this page successfully" })
    })

  })

}