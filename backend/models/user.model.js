import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  codename: { type: String, required: true, unique: true },
  dateofbirth: { type: Date },
  location: { type: String },
  firstname: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;