import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id', getUser);
router.get('/:id/friends', getUserFriends);

/* UPDATE User model friends data*/
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;