import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    // Useful for linking NextAuth Google profiles to this user if using a custom adapter or manual creation
    providerId: {
      type: String,
    },
  },
  { timestamps: true }
);

// If the model is already compiled, use it, otherwise compile it
export default mongoose.models.User || mongoose.model("User", UserSchema);
