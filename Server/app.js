import express from "express";
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
const upload = multer();


// app.use(upload.any());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://find-my-lawyer.netlify.app"
  ],
  credentials: true
}));
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// importing routes

import lawyerRouter from './src/routes/lawyer.routes.js'

app.use('/lawyer',lawyerRouter)

import clientRouter from './src/routes/client.routes.js'

app.use('/client',clientRouter)

import reviewRouter from './src/routes/review.routes.js'

app.use('/review',reviewRouter)

import caseStudyRouter from './src/routes/caseStudy.routes.js'

app.use('/casestudy',caseStudyRouter)

import contactRouter from './src/routes/contact.routes.js'

app.use('/contact', contactRouter);

import messageRouter from './src/utils/nodemailer.js'

app.use('/message', messageRouter);

export default app