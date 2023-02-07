import express from 'express';
const router = express.Router();

import { 
  getComments,
  addComments,
  
} from '../controllers/comment.js'


router.get('/', getComments);
router.post('/', addComments);


export default router