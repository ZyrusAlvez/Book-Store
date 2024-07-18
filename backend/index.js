import express from "express";
import {PORT, mongoURL} from "./config.js"
import mongoose from "mongoose";
import Book from './models/bookModel.js'

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

app.post("/books", async (request, response) => {
  try{
    if (!request.body.title || !request.body.publishYear){
      return response.status(400).send({message: 'require title and publish year'})
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear
    }

    const book = await Book.create(newBook)
    // Book is the model that has the create method that accepts an object (newBook) that will return another object

    return response.status(200).send(book)

  
  }catch(error){
    console.log(error)
    response.status(500).send({message: error.message})
  }
})



