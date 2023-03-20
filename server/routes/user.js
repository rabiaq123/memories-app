import express from "express";
const router = express.Router();

import { signin, signup, getUser, getUsers, updateUserProfile, getUserByID, addFollower, removeFollower, getUserByName} from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
// router.get("/:name", getUser);
router.get("/:id", getUser);
router.get("/", getUsers);
router.get("/get-user-by-name/:name", getUserByName);
router.post('/editprofile', updateUserProfile);
router.get('/userbyid/:id', getUserByID);
router.post('/add-follower', addFollower);
router.post('/remove-follower', removeFollower);

export default router;