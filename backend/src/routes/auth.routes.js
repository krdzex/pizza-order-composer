import express from "express";

import authCtrl from "../controller/auth.controller"

const router = express.Router();

router.route("/auth/signin").post(authCtrl.signIn);
router.route("/auth/signou").get(authCtrl.signOut)

export default router;