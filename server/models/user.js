import mongoose from "mongoose";

const userSchema = mongoose.Schema({
 
  name: { type: String, required:  true },
  // Add a username element to database:
  displayname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  following: { type: [String], required: true, default: [] },
  followers: { type: [String], required: true, default: [] },
   
});

export default mongoose.model("User", userSchema);