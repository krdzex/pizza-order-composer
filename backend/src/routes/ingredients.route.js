import express from "express";

import ingredientCtrl from "../controller/ingredient.controller"

const router = express.Router();

router.route("/api/ingredient").get(ingredientCtrl.list);


export default router;