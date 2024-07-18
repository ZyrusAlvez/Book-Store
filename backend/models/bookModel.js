import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: 'unknown'
    },
    publishYear: {
      type: Number,
      required: true
    },
  },
  {
    timeStamps: true,
  }
)

const Book = mongoose.model('Book', bookSchema)

// this represents the collection in the MongoDB
export default Book