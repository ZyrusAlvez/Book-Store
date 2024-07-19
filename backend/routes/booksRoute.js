import Book from '../models/bookModel.js';
import bookValidation from "../middleware/bookValidation.js";
import express from 'express';

const booksRouter = express.Router();

// Retrieve all books
booksRouter.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json(books);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Retrieve one book by id
booksRouter.get("/:id", async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).json(book);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Create a new book
booksRouter.post("/", bookValidation, async (request, response) => {
  try {
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Update a book by id
booksRouter.put('/:id', bookValidation, async (request, response) => {
  try {
    const result = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book successfully updated", book: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Delete a book by id
booksRouter.delete('/:id', async (request, response) => {
  try {
    const result = await Book.findByIdAndDelete(request.params.id);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book successfully deleted" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

export default booksRouter;
