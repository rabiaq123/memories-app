import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";
import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';
const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) return res.status(401).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  console.log("Started Sign up");
  console.log("REQ BODY: ", req.body)
  const { userName, email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    const oldUserName = await UserModel.findOne({ name: `${userName}` });

    if (oldUser && oldUserName) return res.status(400).json({ message: "both" });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    // check if user name already exists:
    if (oldUserName) return res.status(400).json({ message: "User with that name already exists"})

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ name: `${userName}`, email, password: hashedPassword, displayname: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    console.log(result)
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    // creating a new user object with all the required fields
    // and the additional follower information
    let appended_user = {};
    appended_user['displayname'] = user['displayname'];
    appended_user['email'] = user['email'];
    appended_user['followers'] = user['followers'];
    appended_user['following'] = user['following'];
    appended_user['name'] = user['name'];
    appended_user['password'] = user['password'];
    appended_user['__v'] = user['__v'];
    appended_user['_id'] = user['_id'];

    // iterating through the followers info to get all info for that follower

    let followers_info = [];
    let following_info = [];

    const users = await UserModel.find();
    for (var j = 0; j < users.length; j++) {
      if (appended_user['followers'].includes(users[j]['_id'])) {
        followers_info.push(users[j]);
      }
    }

    for (var j = 0; j < users.length; j++) {
      if (appended_user['following'].includes(users[j]['_id'])) {
        following_info.push(users[j]);
      }
    }
    // UserModel.find().where('_id').in(appended_user['followers']).exec((err, records) => {
    //   // console.log('found followers are:', records);
    //   for (var j = 0; j < records.length; j++) { 
    //     followers_info.push(records[j]);
    //     console.log('The found follower info is:', records[j])
    //   }
    // });

    appended_user['followers'] = followers_info;
    // console.log(followers_info);
    appended_user['following'] = following_info;



    // console.log(typeof(user));
    res.status(200).json(appended_user);
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    // const users = await UserModel.find();
    const { id, name, email, displayname } = req.body;

    console.log("The email is: " + email);
    console.log("The name is: " + name);
    console.log("The display name is: " + displayname);
    var sameEmail = false;
    var sameUsername = false;

    // check if the email or username is the same as the one in the database
    let user = await UserModel.findOne({ email })
    if (user != null) {
      if (user._id == id) sameEmail = true;
      console.log("same email: ", sameEmail)
    }
    user = await UserModel.findOne({ name })
    if (user != null) {
      if (user._id == id) sameUsername = true;
      console.log("same username: ", sameUsername)
    }

    const oldUserName = await UserModel.findOne({ name: `${name}` });
    const oldUser = await UserModel.findOne({ email });
    console.log(oldUser);
    console.log(oldUserName);

    if(!sameEmail && !sameUsername) {
      console.log("here");
      if (oldUser != null && oldUserName != null) return res.status(400).json({ message: "both" });
    }

    if (!sameEmail) {

      if (oldUser) return res.status(400).json({ message: "User already exists" });
    }
    
    if (!sameUsername) {

      if (oldUserName) return res.status(400).json({ message: "User with that name already exists"});
    }

    // updating the user profile
    await UserModel.findOneAndUpdate(
      { "_id": id },
      {
        "$set": {
          "email": email, // the data you want to update
          "name": name,
          "displayname": displayname,
        }
      });

    const updated_user = await UserModel.findById(id);
    // TODO: update all the posts that the user has created
    // const users_posts = await PostMessage.find({ creator: id });
    // for (var i = 0; i < users_posts.length; i++) {
    //   await PostMessage.findByIdAndUpdate(
    //     { "_id": users_posts[i]['_id'] },
    //     {
    //       "$set": {
    //         "creatorName": name, // the data you want to update
    //       }
    //     });
    // }

    res.status(200).json({ "status": 'successfully created user', 'updated_user': updated_user });

  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getUserByID = async (req, res) => {
  try {
    // const users = await UserModel.find();
    const { id } = req.params;

    // getting the user that matches the ID that is sent

    const user = await UserModel.findById(id);

    // const updateUser = { email, name, _id : id};
    // await UserModel.findByIdAndUpdate(id, updateUser, { new: true });

    res.status(200).json({ "message": "this endpoint is still under development", "found_user": user });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

// This function accepts a user id and a new follower id and 
// adds that user to their following list if they do not already exist
export const addFollower = async (req, res) => {

  const { id, new_follower } = req.body;
  // console.log("The user id sent is: " + id);
  // console.log("The new_follower id sent is: " + new_follower);

  try {
    const followedUser = await UserModel.findById(id); // followed user

    if (followedUser == null) {
      console.log("User with id: " + id + " was not found");
      res.status(400).json({ 'message': "User with id: " + id + " was not found" });
      return
    }
    // console.log("The id of the new follower is: " + new_follower);

    const activeUser = await UserModel.findById(new_follower);

    if (activeUser == null) {
      console.log("The new follower with id: " + new_follower + " was not found");
      res.status(400).json({ 'message': "The new follower with id: " + new_follower + " was not found" });
      return
    }

    // adding the user to the new_follower users followers list
    if (activeUser.following.includes(id) == false) {
      activeUser.following.push(id);
      activeUser.save();
    }
    else {
      console.log("The active user was already following the user");
    }

    if (followedUser.followers.includes(new_follower) == false) {
      console.log("Adding the follower: " + new_follower + " to the followers array");

      followedUser.followers.push(new_follower);
      followedUser.save();


      // let appended_user = {};
      // appended_user['email'] = followedUser['email'];
      // appended_user['followers'] = followedUser['followers'];
      // appended_user['following'] = followedUser['following'];
      // appended_user['name'] = followedUser['name'];
      // appended_user['password'] = followedUser['password'];
      // appended_user['__v'] = followedUser['__v'];
      // appended_user['_id'] = followedUser['_id'];

      // // iterating through the followers info to get all info for that follower

      // let followers_info = [];
      // let following_info = [];

      // const users = await UserModel.find();
      // for (var j = 0; j<users.length; j++){
      //   if (appended_user['followers'].includes(users[j]['_id'])){
      //     followers_info.push(users[j]);
      //   }
      // }

      // for (var j = 0; j<users.length; j++){
      //   if (appended_user['following'].includes(users[j]['_id'])){
      //     following_info.push(users[j]);
      //   }
      // }

      // appended_user['followers'] = followers_info;
      // // console.log(followers_info);
      // appended_user['following'] = following_info;

      let appended_user = await create_followers_appended_user(followedUser);


      console.log("Hello from above send appended_user");
      res.status(200).json(appended_user);
      return
    }
    else {
      console.log("The active user " + new_follower + " is already on their following list");

      let appended_user = await create_followers_appended_user(followedUser);

      res.status(200).json(appended_user);
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const removeFollower = async (req, res) => {

  const { id, follower_to_remove } = req.body;
  try {

    // checking to see if the user exists
    const unfollowedUser = await UserModel.findById(id);

    if (unfollowedUser == null) {
      console.log("The user with id: " + id + " was not found");
      res.status(400).json({ 'message': "The user id: " + id + " was not found" });
      return
    }

    // checking to see if the removed user exists
    const activeUser = await UserModel.findById(follower_to_remove);
    if (activeUser == null) {
      console.log("The user with id: " + activeUser + " was not found, this was the requesting unfollower");
      res.status(400).json({ 'message': "The new follower with id: " + activeUser + " was not found" });
      return
    }

    let index = unfollowedUser.followers.indexOf(follower_to_remove);

    if (index > -1) {
      // found the user to remove from the followers list
      unfollowedUser.followers.splice(index, 1);
      unfollowedUser.save()
      console.log("Removed the requester's id from the user's followers list");

      // removing the user from the requester's list
      let index_of_unfollowed = activeUser.following.indexOf(id);
      if (index_of_unfollowed > -1) {
        activeUser.following.splice(index_of_unfollowed, 1);
        activeUser.save()
        console.log("Removed the user's id from the requester's following list");
      }
      else {
        console.log("The user's id was not found in the requester's following list.")
      }
    }
    else {
      console.log("The requester's id was not found in the user's followers list.");
    }

    res.status(200).json(unfollowedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    return
  }

}


export const getUserByName = async (req, res) => {

  const { name } = req.params;

  // getting the user that matches the ID that is sent

  const user = await UserModel.findOne({ name });

  // const updateUser = { email, name, _id : id};
  // await UserModel.findByIdAndUpdate(id, updateUser, { new: true });

  res.status(200).json(user);
}


const create_followers_appended_user = async (user) => {

  let appended_user = {};
  appended_user['displayname'] = user['displayname'];
  appended_user['email'] = user['email'];
  appended_user['followers'] = user['followers'];
  appended_user['following'] = user['following'];
  appended_user['name'] = user['name'];
  appended_user['password'] = user['password'];
  appended_user['__v'] = user['__v'];
  appended_user['_id'] = user['_id'];

  // iterating through the followers info to get all info for that follower

  let followers_info = [];
  let following_info = [];

  const users = await UserModel.find();
  for (var j = 0; j < users.length; j++) {
    if (appended_user['followers'].includes(users[j]['_id'])) {
      followers_info.push(users[j]);
    }
  }

  for (var j = 0; j < users.length; j++) {
    if (appended_user['following'].includes(users[j]['_id'])) {
      following_info.push(users[j]);
    }
  }

  appended_user['followers'] = followers_info;
  // console.log(followers_info);
  appended_user['following'] = following_info;
  // console.log (appended_user);
  return appended_user;
}

export const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(user_id)) return res.status(404).json({ 'message': "The user_id: " + user_id + " is not a valid object id" });

  // await PostMessage.findByIdAndRemove(id);

  // getting the user object of the user that is to be deleted
  const user_to_delete = await UserModel.findById(user_id);

  if (user_to_delete === null) {
    res.status(400).json({ 'message': "The user with id: " + user_id + " could not be found" });
    return
  }

  // iterating through all of the followers of the user to be deleted and removing the user from their following list
  for (var j = 0; j < user_to_delete['followers'].length; j++) {
    // console.log (`User: ${user_to_delete['followers'][j]} is following this user`);
    const current_user_follower = await UserModel.findById(user_to_delete['followers'][j]);

    // checking to see if the user to be deleted is in this current user's following list and if so, removing them.
    let index = current_user_follower['following'].indexOf(user_id);
    if (index > -1) {

      console.log(`Current user being looked at is: ${current_user_follower['_id']}`);
      console.log(`Found the requested user (${user_id}) in thier following list. Removing this user from their following list`);

      // found the user to remove from the followers list
      current_user_follower['following'].splice(index, 1);
      current_user_follower.save();

    }
  }

  user_to_delete['followers'] = [];
  // user_to_delete.save();

  // going through the following list of the user to be deleted and removing this user
  // from each user's followers list
  for (var j = 0; j < user_to_delete['following'].length; j++) {
    // console.log (`User: ${user_to_delete['followers'][j]} is following this user`);
    const current_user_following = await UserModel.findById(user_to_delete['following'][j]);

    // checking to see if the user to be deleted is in this current users following list and if so, removing them.
    let index = current_user_following['followers'].indexOf(user_id);
    if (index > -1) {

      console.log(`Current user being looked at is: ${current_user_following['_id']}`);
      console.log(`Found the requested user (${user_id}) in their followers list. Removing this user from their following list`);

      // found the user to be deleted in the followers of the current_user_following and removing
      // the id of the user to be deleted.
      current_user_following['followers'].splice(index, 1);
      current_user_following.save();

    }
  }

  user_to_delete['following'] = [];
  user_to_delete.save();

  // going through each of the posts created by the user to be deleted and deleting them
  const users_posts = await PostMessage.find({ creator: user_id });
  for (var i = 0; i < users_posts.length; i++) {
    await PostMessage.findByIdAndRemove(users_posts[i]['_id']);
    console.log(`Removed a post with the title ${users_posts[i]['title']}`);
  }

  // finding all the posts that have likes from the user to be deleted and deleting them
  const all_posts = await PostMessage.find();

  for (var i = 0; i < all_posts.length; i++) {

    if (all_posts[i]['likes'].includes(user_id)) {
      console.log(`***\nFound a post that the user: ${user_id} (the user to be deleted) liked\nThat post has the title: ${all_posts[i]['title']}`)
      let index = all_posts[i]['likes'].indexOf(user_id);
      if (index > -1) {
        console.log(`removing ${user_id} from the likes list`);
        all_posts[i]['likes'].splice(index, 1);
        all_posts[i].save();
      }
    }
  }

  // finding any comments that the user to be deleted left on posts and removing them
  console.log("*****\n");
  for (var i = 0; i < all_posts.length; i++) {
    let current_comments = all_posts[i]['comments'];

    // iterating through each of the comments and splicing the name
    // to check if the name is the same as the user that is being
    // deleted
    for (var j = 0; j < current_comments.length; j++) {
      let split_comment = current_comments[j].split(':');

      if (split_comment[0] === user_to_delete['name']) {
        console.log(`Found a comment authored by the user to delete (${user_to_delete['name']})\nThe comment is: ${split_comment[1]}`);
        all_posts[i]['comments'].splice(j, 1);
        all_posts[i].save();
      }
    }
  }

  //deleting the user profile of the user that was requested to be deleted.
  await UserModel.findByIdAndRemove(user_id);


  res.status(200).json({ "message": `The user with id ${user_id} was successfully deleted`, 'user_deleted': user_to_delete });
}