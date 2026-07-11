// routes/contact.route.js
import express from 'express';
import { contactwithus } from '../utils/nodemailer.js';

const router = express.Router();

router.post('/send-message', contactwithus);

export default router;
