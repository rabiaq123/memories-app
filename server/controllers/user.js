import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

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
    for (var j = 0; j<users.length; j++){
      if (appended_user['followers'].includes(users[j]['_id'])){
        followers_info.push(users[j]);
      }
    }

    for (var j = 0; j<users.length; j++){
      if (appended_user['following'].includes(users[j]['_id'])){
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
    const {id, name, email} = req.body;
    
    // getting the user that matches the ID that is sent

    const user = await UserModel.findById(id);

    // const updateUser = { email, name, _id : id};
    // await UserModel.findByIdAndUpdate(id, updateUser, { new: true });
    
    console.log("The email is: " + email);
    console.log("The name is: " + name);
    // updating the user profile
    await UserModel.findOneAndUpdate(
      { "_id": id},
      { 
          "$set": {
              "email": email, // the data you want to update
              "name" : name
          }
      });

    const updated_user = await UserModel.findById(id);
    res.status(200).json({"status": 'successfully created user', 'updated_user' : updated_user});

  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getUserByID = async (req, res) => {
  try {
    // const users = await UserModel.find();
    const {id} = req.params;
    
    // getting the user that matches the ID that is sent

    const user = await UserModel.findById(id);

    // const updateUser = { email, name, _id : id};
    // await UserModel.findByIdAndUpdate(id, updateUser, { new: true });

    res.status(200).json({"message": "this endpoint is still under development", "found_user" : user});
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

// This function accepts a user id and a new follower id and 
// adds that user to their following list if they do not already exist
export const addFollower = async (req, res) => {

  const {id, new_follower} = req.body;
  // console.log("The user id sent is: " + id);
  // console.log("The new_follower id sent is: " + new_follower);
  
  try {
    const followedUser = await UserModel.findById(id); // followed user

    if (followedUser == null){
      console.log("User with id: " + id + " was not found");
      res.status(400).json({ 'message': "User with id: " + id + " was not found"});
      return
    }
    // console.log("The id of the new follower is: " + new_follower);
    
    const activeUser = await UserModel.findById(new_follower);

    if (activeUser == null){
      console.log("The new follower with id: " + new_follower + " was not found");
      res.status(400).json({ 'message': "The new follower with id: " + new_follower + " was not found"});
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
      console.log ("Adding the follower: " + new_follower + " to the followers array");

      followedUser.followers.push(new_follower);
      followedUser.save();
      res.status(200).json(followedUser);
      return
    }
    else {
      console.log("The active user " + new_follower +  " is already on their following list");
      res.status(200).json(followedUser);
      return
    }
  }catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const removeFollower = async (req, res) => {

  const {id, follower_to_remove} = req.body;
  try {

    // checking to see if the user exists
    const unfollowedUser = await UserModel.findById(id);

    if (unfollowedUser == null){
      console.log("The user with id: " + id + " was not found");
      res.status(400).json({ 'message': "The user id: " + id + " was not found"});
      return
    }

    // checking to see if the removed user exists
    const activeUser = await UserModel.findById(follower_to_remove);
    if (activeUser == null){
      console.log("The user with id: " + activeUser + " was not found, this was the requesting unfollower");
      res.status(400).json({ 'message': "The new follower with id: " + activeUser + " was not found"});
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
        console.log ("Removed the user's id from the requester's following list");
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
   
    const {name} = req.params;
    
    // getting the user that matches the ID that is sent

    const user = await UserModel.findOne({ name });

    // const updateUser = { email, name, _id : id};
    // await UserModel.findByIdAndUpdate(id, updateUser, { new: true });

    res.status(200).json(user);
}


// Edit user profile
// export const updateUserProfile = asyncHandler(async (req, res) => {
//     const user = await UserModal.findById(req.user._id);
//     // if the user exists then update the following fields
//     if (user) {
//       user.name = req.body.name || user.name; 
//       user.email = req.body.email || user.email;
//       // Are we adding a picture? 

//       if(req.body.password) {
//         user.password = req.body.password;
//       }

//       const updatedUser = await user.save();

//       res.json({
//         _id:updatedUser._id,
//         name:updatedUser.name, 
//         email:updatedUser.email,

//       });
//     }else {
//       res.status(404)
//       throw new Error("User not found!");
//     }

// });