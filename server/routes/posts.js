import express from 'express';

import { getPosts, getPostsBySearch, getPostsByCreator, getPostsByCreatorId, getPost, createPost, updatePost, likePost, commentPost, deletePost, getPostFromFollowing } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getPostsByCreator);
router.get('/creatorId', getPostsByCreatorId);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/getfollowingposts', getPostFromFollowing);
router.get('/:id', getPost);


router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);

// route for getting posts from users followers

export default router;