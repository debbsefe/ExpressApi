import express from 'express';

import { createUser, signinUser } from '../controllers/userController';
import { verifyToken, } from '../auth/authentication';

const router = express.Router();

// users Routes

router.post('/auth/signup', createUser);
router.post('/auth/signin', verifyToken, signinUser);

export default router;
