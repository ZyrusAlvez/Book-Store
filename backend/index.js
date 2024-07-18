import express from "express";
import {PORT, mongoURL} from "./config.js"
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoute.js";

async function startServer(){
  try{
    await mongoose.connect(mongoURL); // this will pause to wait for the method to be finish
    console.log('connected to the database')

    app.listen(PORT, (request, response) => {
      console.log(`connected to port ${PORT}`)
    })

  }catch(error){
    console.error(error)
  }
}

startServer()
const app = express();

app.use(express.json()); // Middleware for parsing request body

app.use("/api/Books", booksRouter)