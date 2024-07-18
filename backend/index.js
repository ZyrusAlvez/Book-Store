import express from "express";
import {PORT, mongoURL} from "./config.js"
import mongoose from "mongoose";
import Book from './models/bookModel.js'
import bookValidation from "./middleware/bookValidation.js"

const app = express();

// Middleware for parsing request body
app.use(express.json());

async function startServer(){
  try{
    await mongoose.connect(mongoURL); // this will pause to wait for the method to be finish before proceeding to another line of code?
    console.log('connected to the database')

    app.listen(PORT, (request, response) => {
      console.log(`connected to port ${PORT}`)
    })

  }catch(error){
    console.error(error)
  }
}
startServer()


// ROUTES

app.get("/", (request, response) => {
  response.send("home page")
})

// retrieve all books
app.get("/books", async (request, response) => {
  try{
    const books = await Book.find({});
    return response.status(200).json(books);

  }catch(error){
    console.log(error)
    response.status(500).send({message: error.message})
  }
})

// retrieve one book by id
app.get("/books/:id", async (request, response) => {
  try{
    const books = await Book.findById(request.params.id);
    return response.status(200).json(books);

  }catch(error){
    console.log(error)
    response.status(500).send({message: error.message})
  }
})

app.post("/books", bookValidation, async (request, response) => {
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

app.put('/books/:id', bookValidation, async (request, response) => {
  try{
    // request.body is an object
    // the method that will actually do the work (returns true or false)
    const result = await Book.findByIdAndUpdate(request.params.id, request.body)

    if (!result){
      return response.status(404).send({message: "Book not found"})
    } 
    return response.status(200).send({message: "Book successfully updated"})

  }catch(error){
    console.log(error)
    response.status(500).send({message: error.message})
  }
})


app.delete('/books/:id', bookValidation, async (request, response) => {
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