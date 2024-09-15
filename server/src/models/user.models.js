import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String, // URL to the profile picture
    default: "",
  },
  role: {
    type: String,
    enum: ["customer", "admin", "supplier"], // You can extend this list based on your roles
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the User model
const User = mongoose.model("User", userSchema);

export default User;
