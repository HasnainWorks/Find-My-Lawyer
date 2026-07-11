import { Router } from "express";
import { loginInClient, registerClient } from "../controllers/client.controllers.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = Router()


router.route('/registerclient').post( registerClient )
router.route('/logininclient').post( loginInClient )




export default router

