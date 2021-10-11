import express from "express";

import addressCtrl from "../controller/address.controller"

const router = express.Router();

router.route("/api/address").post(addressCtrl.create);
router.route("/api/address/:user").get(addressCtrl.list)

export default router;