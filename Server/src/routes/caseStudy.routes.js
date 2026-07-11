import { Router } from "express";
import { getAllCaseStudies, postCaseStudy } from "../controllers/caseStudy.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.js";
import { isLawyer } from "../middlewares/checkLawyer.js";


const router = Router()
router.route('/getallcasestudies').get(getAllCaseStudies)
router.route('/postcasestudies').post(verifyJWT, isLawyer, upload.single('myfile2'), postCaseStudy)


export default router
