import express from "express";
const router = express.Router();
import * as subscriberController from "./subscriber.controller.js";

router.post("/", subscriberController.subscribe);

export default router;
