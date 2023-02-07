import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';

import authRoute from './routes/auth.js'
import userRoutes from './routes/users.js'
import commentsRoutes from './routes/comments.js'
import PostsRoutes from './routes/posts.js'
import likesRoutes from './routes/likes.js'
import relationshipRoutes from './routes/relationships.js'

// middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next();
})
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3001'
}))
app.use(cookieParser())

// multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res)=> {
  const file = req.file
  res.status(200).json(file.filename)
})

//
app.use('/api/auth', authRoute);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/posts', PostsRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/relationships', relationshipRoutes);

app.listen(3000, ()=> {
  console.log('Server is up & listening');
})