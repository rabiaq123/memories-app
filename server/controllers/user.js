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

    res.status(200).json(user);
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
  try {
    const user = await UserModel.findById(id);
    // console.log("The user id sent is: " + id);
    // console.log("The new_follower id sent is: " + new_follower);
    if (user == null){
      console.log("User with id: " + id + " was not found");
      res.status(400).json({ 'message': "User with id: " + id + " was not found"});
      return
    }
    // console.log("The id of the new follower is: " + new_follower);
    
    
    const followed_user = await UserModel.findById(new_follower);

    if (followed_user == null){
      console.log("The new follower with id: " + new_follower + " was not found");
      res.status(400).json({ 'message': "The new follower with id: " + new_follower + " was not found"});
      return
    }

    // adding the user to the new_follower users followers list
    if (followed_user.following.includes(id) == false) {
      followed_user.following.push(id);
      followed_user.save();
    }
    else {
      console.log("The user was already on the new_users followers list");
    }

    if (user.followers.includes(new_follower) == false) {
      console.log ("Adding the follower: " + new_follower + " to the followers array");

      user.followers.push(new_follower);
      user.save();
      res.status(200).json({user});
      return
    }
    else {
      console.log("The user " + new_follower +  " is already on their following list");
      res.status(200).json({user});
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
    const user = await UserModel.findById(id);

    if (user == null){
      console.log("The user with id: " + id + " was not found");
      res.status(400).json({ 'message': "The user id: " + id + " was not found"});
      return
    }

    // checking to see if the removed user exists
    const removed_user = await UserModel.findById(follower_to_remove);
    if (removed_user == null){
      console.log("The user with id: " + removed_user + " was not found, this was the requested user to remove");
      res.status(400).json({ 'message': "The new follower with id: " + removed_user + " was not found"});
      return
    }


    let index = user.following.indexOf(follower_to_remove);

    if (index > -1) {
      // found the user to remove from the following list
      user.following.splice(index, 1);
      user.save()
      console.log("removed the requested id from the users following list");

      // removing the current user from the followed users list
      let index_of_removed = removed_user.followers.indexOf(id);
      if (index_of_removed > -1) {
        removed_user.followers.splice(index_of_removed, 1);
        removed_user.save()
        console.log ("Removed the id of the requester from the removed users followers list");
      }
      else {
        console.log("The id of the requester was not in the followers list of the id to be removed.")
      }


    }
    else {
      console.log("The id of the user to remove was not found in the users following list");
    }
  
    res.status(200).json({user});

  }catch (error) {
    res.status(500).json({ message: error.message });
    return
  }

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