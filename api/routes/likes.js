import express from 'express';
const router = express.Router();

import { 
  addLike,
  getLikes,
  removeLike,
  
} from '../controllers/like.js'


router.post('/', addLike);
router.get('/', getLikes);
router.delete('/', removeLike);


export default router