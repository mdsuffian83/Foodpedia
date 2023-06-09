import express from 'express';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  updatePost,
  deletePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ all posts */
router.get('/', getFeedPosts);
/* READ post from a user*/
router.get('/:userId/posts', getUserPosts);

/* UPDATE post model like status*/
router.patch('/:id/like', verifyToken, likePost);

/* DELETE a post */
router.delete('/:id', verifyToken, deletePost);

export default router;
