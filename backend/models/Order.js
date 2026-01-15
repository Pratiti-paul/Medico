const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    medicines: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine"
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "COD"],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending"
    },
    status: {
      type: String,
      enum: ["placed", "delivered"],
      default: "placed"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);
