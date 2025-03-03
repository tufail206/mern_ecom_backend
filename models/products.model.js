const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      minLength: 3,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
      minLength: 10,
    },
    mainImage: {
      type: String,
      default: "/image/placeholder.png",
    },
    subImage: {
      type: [String],
      default: [
        "/image/placeholder.png",
        "/image/placeholder.png",
        "/image/placeholder.png",
      ],
      validate: {
        validator: function (arr) {
          return arr.every((url) => typeof url === "string");
        },
        message: "All subImages must be valid image URLs.",
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    size: {
      type: string,
      enum: ["sm", "md", "lg"],
      default: "md",
    },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Limited"],
      default: "In Stock",
    },
    // ref to review models
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports= model("Product", productSchema);
