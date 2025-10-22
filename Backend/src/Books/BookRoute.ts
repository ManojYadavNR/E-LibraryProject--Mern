import express from "express";
import { BookCreate } from "./BookController.ts";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ✅ recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BookRouter = express.Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fieldSize: 3e7 },
});

BookRouter.post(
  "/create",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  BookCreate
);

export default BookRouter;
