import type { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary.ts";
import path from "node:path";
import { fileURLToPath } from "node:url";
import BookModel from "./BookModel.ts";
import fs from "node:fs";
import type{ AuthRequest } from "../middleware/authentication.ts";
import createHttpError from "http-errors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BookCreate = async (req: Request, res: Response, next: NextFunction) => {
    const {title,genre}=req.body
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files?.cover?.[0]) {
      return res.status(400).json({ message: "Cover file is missing" });
    }

    const coverFileName = files.cover[0].filename;
    const coverImageMimeType = files.cover[0].mimetype.split("/").at(-1);
    const coverFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      coverFileName
    );

    const uploadBookCover = await cloudinary.uploader.upload(coverFilePath, {
      filename_override: coverFileName,
      folder: "Book-cover",
      format: coverImageMimeType,
    });

   
    if (!files?.file?.[0]) {
      return res.status(400).json({ message: "Book file is missing" });
    }

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const uploadBookFile = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: "raw",
      filename_override: bookFileName,
      folder: "Book-pdfs",
      format: "pdf",
    });
    const _req= req as AuthRequest
   const newBook = await BookModel.create({
    title,
    author:_req.userId,
    genre,
    cover:uploadBookCover.secure_url,
    file:uploadBookFile.secure_url
   })


   await fs.promises.unlink(coverFilePath) ;
   await fs.promises.unlink(bookFilePath) ;

    res.status(201).json({
      message: "Book created successfully",
      id:newBook._id,
      coverUrl: uploadBookCover.secure_url,
      bookUrl: uploadBookFile.secure_url,
    });
  } catch (err) {
    next(err);
  }
};
const BookUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  const id = req.params.id;

  try {
    const book = await BookModel.findById(id);
    if (!book) return next(createHttpError(404, "Book not found"));

    const _req = req as AuthRequest;
    if (book.author.toString() !== _req.userId) {
      return next(createHttpError(401, "You cannot update other books"));
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    let completeCover = "";
    if (files?.cover?.[0]) {
      const filename = files.cover[0].filename;
      const coverMimeType = files.cover[0].mimetype.split("/").at(-1);
      const filepath = path.resolve(__dirname, "../../public/data/uploads", filename);

      const uploadBookCover = await cloudinary.uploader.upload(filepath, {
        filename_override: filename,
        folder: "Book-cover",
        format: coverMimeType,
      });

      completeCover = uploadBookCover.secure_url;

      try {
        await fs.promises.unlink(filepath);
      } catch (err) {
        console.warn("Failed to delete cover file:", err.message);
      }
    }

    let completeFile = "";
    if (files?.file?.[0]) {
      const filename = files.file[0].filename;
      const bookFilePath = path.resolve(__dirname, "../../public/data/uploads", filename);

      const uploadBookFile = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: "raw",
        filename_override: filename,
        folder: "Book-pdfs",
        format: "pdf",
      });

      completeFile = uploadBookFile.secure_url;

      try {
        await fs.promises.unlink(bookFilePath);
      } catch (err) {
        console.warn("Failed to delete book file:", err.message);
      }
    }

    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      {
        title,
        genre,
        cover: completeCover || book.cover,
        file: completeFile || book.file,
      },
      { new: true }
    );

    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};
const BookList =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books= await BookModel.find()
        if(!books){
            return next(createHttpError(404,"No books yet"))
        }
         res.json({message:"your books",books:books})
    } catch (error) {
        return next(createHttpError(500,"error while fetching books"))
    }
    res.json({message:"your books"})
}
const Book=async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
         const book = await BookModel.findOne({_id:id})
         if(!book){
            return next(createHttpError(404,"Book not found"))
         }
    res.json({Message:"your book",book:book})
        
    } catch (error) {
        return next(createHttpError(500,"error while fetching the book"))
    }
   
}
export { BookCreate ,BookUpdate,BookList,Book};
