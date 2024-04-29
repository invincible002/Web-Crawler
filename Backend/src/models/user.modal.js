import mongoose, { Schema } from "mongoose";

const chatEntrySchema = new Schema({
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "system"],
  },
  parts: [{ text: { type: String } }],
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowecase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    queryCount: {
      type: Number,
    },
    website: {
      type: String,
    },
    chatHistory: [chatEntrySchema],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
