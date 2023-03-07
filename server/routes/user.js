import express from "express";
const router = express.Router();

import { signin, signup, getUser, getUsers, updateUserProfile, getUserByID} from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
// router.get("/:name", getUser);
router.get("/:id", getUser);
router.get("/", getUsers);
router.post('/editprofile', updateUserProfile);
router.get('/userbyid/:id', getUserByID);

export default router;