import express from 'express';
const router = express.Router();

import { 
  getUser, 
  updateUser, 
  
} from '../controllers/user.js'


router.get('/find/:id', getUser);
router.put('/', updateUser);


export default router