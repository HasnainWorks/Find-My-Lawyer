import { Router } from "express";
import { getAllLawyers, getcivilMatterLawyer, getcompanyRegLawyer, getcriminalMatterLawyer, getdivorceLawyer, getExperties, getfamilyMatterLawyer, getimmigrationLawyer, getLawyerById, getlegalNoticeLawyer, getmediationLawyer, getrecoveryMatterLawyer, getserviceMatterLawyer, gettaxfilingLawyer, gettrademarkLawyer, loginInLawyer, logOutLawyer, RefreshedRefreshToken, registerLawyer, sendMessageToLawyer } from "../controllers/lawyer.controllers.js";
const router = Router()
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.js";

router.route('/registerlawyer').post(
    upload.single('image'),
    registerLawyer
  );
  
  
router.route('/logininlawyer').post( loginInLawyer )
router.route('/getalllawyers').get( getAllLawyers )
router.route('/profile/:id').get( verifyJWT, getLawyerById )

router.route('/lawyerprofile/:id').get( verifyJWT, getLawyerById )
router.route('/expertise/:expertise').get(verifyJWT, getExperties )
router.route('/getlegalnoticelawyers').get(verifyJWT, getlegalNoticeLawyer )
router.route('/getcriminalmatterlawyers').get(verifyJWT, getcriminalMatterLawyer)
router.route('/getdivorceLawyer').get(verifyJWT, getdivorceLawyer)
router.route('/getfamilyMatterLawyer').get(verifyJWT, getfamilyMatterLawyer)
router.route('/getmediationLawyer').get(verifyJWT, getmediationLawyer)
router.route('/getcompanyRegLawyer').get(verifyJWT, getcompanyRegLawyer)
router.route('/gettrademarkLawyer').get(verifyJWT, gettrademarkLawyer)
router.route('/gettaxfilingLawyer').get(verifyJWT, gettaxfilingLawyer)
router.route('/getrecoveryMatterLawyer').get(verifyJWT, getrecoveryMatterLawyer)
router.route('/getimmigrationLawyer').get(verifyJWT, getimmigrationLawyer)
router.route('/getserviceMatterLawyer').get(verifyJWT, getserviceMatterLawyer)
router.route('/getcivilMatterLawyer').get(verifyJWT, getcivilMatterLawyer)
router.route('/logout').post(verifyJWT, logOutLawyer)


router.route('/sendmessagetolawyer').post(
  sendMessageToLawyer
)




export default router

