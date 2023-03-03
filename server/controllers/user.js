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
  const { name } = req.params;

  try {
    const user = await UserModel.findOne({ name });

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
    const {id, email, name} = req.body;
    
    // getting the user that matches the ID that is sent

    const user = await UserModel.findById(id);

    // const updateUser = { email, name, _id : id};
    // await UserModel.findByIdAndUpdate(id, updateUser, { new: true });

    // upateing the user profile
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