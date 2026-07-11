import { Router } from "express";
import { sendEmailToLawyer } from "../controllers/contact.controller.js";
const router = Router()


router.route('/sendemailtolawyer').post( sendEmailToLawyer )



export default router

