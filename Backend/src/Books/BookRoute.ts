import express from "express";
import { Book, BookCreate, BookList, BookUpdate } from "./BookController.ts";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import authMiddleware from "../middleware/authentication.ts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BookRouter = express.Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fieldSize: 3e7 },
});
BookRouter.get('/',BookList)
BookRouter.get('/:id',Book)
BookRouter.post(
  "/create",authMiddleware,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  BookCreate
);
BookRouter.patch(
  "/:id",authMiddleware,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  BookUpdate
);
export default BookRouter;
