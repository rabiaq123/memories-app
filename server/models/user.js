import mongoose from "mongoose";

const userSchema = mongoose.Schema({
 
  name: { type: String, required:  true }, // serves as the username (unique)
  displayname: { type: String, required: true }, // new addition to the schema; serves as the full name
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  following: { type: [String], required: true, default: [] },
  followers: { type: [String], required: true, default: [] },
   
});

export default mongoose.model("User", userSchema);