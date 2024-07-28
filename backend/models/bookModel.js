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

export default Book
// returning a mongoose model that will be used to interact with the MongoDB collection