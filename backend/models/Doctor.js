const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    specialization: {
      type: String,
      required: true
    },

    experience: {
      type: Number, // in years
      required: true
    },

    consultationFee: {
      type: Number,
      required: true
    },

    image: {
      type: String, // image URL
      required: true
    },

    rating: {
      type: Number,
      default: 4.5
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
