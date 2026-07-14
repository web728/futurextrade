import mongoose, { Schema, model, models } from "mongoose";

const LeadSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    company: {
      type: String,
      default: "—",
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    designation: {
      type: String,
      default: "—",
      trim: true,
    },
    interestType: {
      type: String,
      required: [true, "Interest pathway selection is required"],
    },
    message: {
      type: String,
      default: "—",
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Lead = models.Lead || model("Lead", LeadSchema);

export default Lead;