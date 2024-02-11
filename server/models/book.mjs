import { model, Schema } from "mongoose";

const bookSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      get: (val) => {
        return Math.round(val);
      },
      set: (val) => {
        return Math.round(val);
      },
    },
    description: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);
export default Book;
