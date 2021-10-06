import express from "express";
import orderCtrl from "../controller/order.controller"

const router = express.Router()

router.route("/api/orders").post(orderCtrl.create);

export default router;