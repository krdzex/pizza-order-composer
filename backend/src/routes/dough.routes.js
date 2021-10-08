import express from "express";

import doughtCtrl from "../controller/dough.controller"

const router = express.Router();

router.route("/api/dough").get(doughtCtrl.list);


export default router;