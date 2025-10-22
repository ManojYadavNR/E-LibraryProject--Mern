import express  from "express";
import { BookCreate } from "./BookController.ts";



const BookRouter= express.Router()


BookRouter.post("/Create",BookCreate)



export default BookRouter;