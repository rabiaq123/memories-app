import express from "express";
const router = express.Router();

import { signin, signup, getUser, getUsers, updateUserProfile } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:name", getUser);
router.get("/", getUsers);
router.get("/user/:name", getUser);
router.post('/editprofile', updateUserProfile);

export default router;