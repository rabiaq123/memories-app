import express from "express";
const router = express.Router();

import { signin, signup, getUser } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:name", getUser);

export default router;