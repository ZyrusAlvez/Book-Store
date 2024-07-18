import Book from '../models/bookModel.js'
import bookValidation from "../middleware/bookValidation.js"
import express from 'express'

const booksRouter = express.Router();

// retrieve all books
booksRouter.get("/", async (request, response) => {
  try{
    const books = await Book.find({});
    return response.status(200).json(books);

  }catch(error){
    console.log(error)
    response.status(500).send({message: error.message})
  }
})

// retrieve one book by id
booksRouter.get("/:id", async (request, response) => {
  try{
    const books = await Book.findById(request.params.id);
    return response.status(200).json(books);

  }catch(error){
    console.log(error)
    response.status(500).send({message: error.message})
  }
})

booksRouter.post("/", bookValidation, async (request, response) => {
  try{
    // Create a new book object with the data from the request body
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear
    }

    // Use the Book model to create a new document in the 'books' collection
    // The create method accepts the newBook object and returns the created document
    const book = await Book.create(newBook);

    // Return the created book document in the response with a 200 status code
    return response.status(200).send(book);

  
  }catch(error){
    console.log(error)
    response.status(500).send({message: error.message})
  }
})

booksRouter.put('/:id', bookValidation, async (request, response) => {
  try{
    // request.body is an object
    // the method that will actually do the work (returns true or false)
    const result = await Book.findByIdAndUpdate(request.params.id, request.body)

    if (!result){
      return response.status(404).send({message: "Book not found"})
    } 
    return response.status(201).send({message: "Book successfully updated"})

  }catch(error){
    console.log(error)
    response.status(500).send({message: error.message})
  }
})

booksRouter.delete('/:id', bookValidation, async (request, response) => {
  try{
    // the method that will actually do the work (returns true or false)
    const result = await Book.findByIdAndDelete(request.params.id)

    if (!result){
      return response.status(404).send({message: "Book not found"})
    } 
    return response.status(200).send({message: "Book successfully deleted"})

  }catch(error){
    console.log(error)
    response.status(500).send({message: error.message})
  }
})

export default booksRouter