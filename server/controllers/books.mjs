import { validationResult } from "express-validator";
import Book from "../models/book.mjs";

const getAllBooks = async (req, res) => {
  const books = await Book.find().sort({ updatedAt: -1 });
  res.json(books);
};

const getBookById = async (req, res) => {
  const _id = req.params.id;
  const book = await Book.findById(_id);

  if (book === null) return res.status(404).json({ msg: "Page Not Found" });

  res.json(book);
};

const registBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const book = new Book(req.body);
  const newBook = await book.save();
  res.status(201).json(newBook);
};

const updateBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const { title, rating, comment, description } = req.body;
  const _id = req.params.id;
  const book = await Book.findById(_id);

  if (book === null) return res.status(404).json({ msg: "Page Not Found" });

  if (title !== undefined) book.title = title;
  if (rating !== undefined) book.rating = rating;
  if (description !== undefined) book.description = description;
  if (comment !== undefined) book.comment = comment;
  await book.save();
  res.json(book);
};

const deleteBook = async (req, res) => {
  const _id = req.params.id;
  const { deletedCount } = await Book.deleteOne({ _id });
  if (deletedCount === 0)
    return res.status(404).json({ msg: "Delete Book Not Found" });

  res.json({ msg: "Delete succeed." });
};

export { getAllBooks, getBookById, registBook, updateBook, deleteBook };
