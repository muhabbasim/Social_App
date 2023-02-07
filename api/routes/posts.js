import express  from 'express';
const router = express.Router();

import { 
  getPosts,
  addPost,
  deletePost

} from '../controllers/post.js'


router.get('/', getPosts);
router.post('/', addPost);
router.delete('/', deletePost);


export default router