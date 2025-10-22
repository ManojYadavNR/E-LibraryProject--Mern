import type { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary.ts";
import path from "node:path";
import { fileURLToPath } from "node:url";
import BookModel from "./BookModel.ts";
import fs from "node:fs";
import type{ AuthRequest } from "../middleware/authentication.ts";

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

export { BookCreate };
