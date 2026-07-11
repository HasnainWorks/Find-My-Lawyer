import { Router } from "express";
import { getReviews, postReviews } from "../controllers/review.controller.js";


const router = Router()


router.route('/postreviews').post( postReviews )
router.route('/getreviews').get( getReviews )

export default router