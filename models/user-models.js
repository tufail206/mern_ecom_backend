const { Schema, model } =require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required:[ true,"username is required "], trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date, index: { expires: "1h" } }, // Token expires after 1 hour
    otp: {
      type: String,
      default: null,
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    cart: [
      {
        _id: false, 
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1, min: 1 }, // Prevent negative values

      },
    ],
    favorite: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],

    cancellations: [
      {
        orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
      },
    ],

    reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
