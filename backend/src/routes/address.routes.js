import express from "express";

import addressCtrl from "../controller/address.controller"

const router = express.Router();

router.route("/api/address").post(addressCtrl.create);
router.route("/api/address/:user").get(addressCtrl.list)
router.route("/api/address/:id").delete(addressCtrl.deleteOne)

export default router;