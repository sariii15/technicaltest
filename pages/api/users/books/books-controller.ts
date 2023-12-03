// src/api/books/books.controller.ts
import { Request, Response } from "express";
import { Book, BookInput } from "./books-model";
import { authenticate } from "../auth/auth-middleware";

const books: Book[] = [];

// Middleware autentikasi untuk semua endpoint buku
const authMiddleware = authenticate;

// Fungsi untuk mendapatkan semua buku dengan filter
export const getAllBooks = [
  authenticate,
  (req: Request, res: Response) => {
    // Mendapatkan parameter query dari URL
    const { title, minYear, maxYear, minPage, maxPage, sortByTitle } =
      req.query;

    // Menerapkan filter sesuai dengan parameter query yang diterima
    let filteredBooks = [...books];

    if (title) {
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(title.toString().toLowerCase())
      );
    }

    if (minYear) {
      filteredBooks = filteredBooks.filter(
        (book) => book.release_year >= parseInt(minYear.toString(), 10)
      );
    }

    if (maxYear) {
      filteredBooks = filteredBooks.filter(
        (book) => book.release_year <= parseInt(maxYear.toString(), 10)
      );
    }

    if (minPage) {
      filteredBooks = filteredBooks.filter(
        (book) => book.total_page >= parseInt(minPage.toString(), 10)
      );
    }

    if (maxPage) {
      filteredBooks = filteredBooks.filter(
        (book) => book.total_page <= parseInt(maxPage.toString(), 10)
      );
    }

    if (sortByTitle) {
      filteredBooks.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return sortByTitle === "asc"
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
    }

    res.json(filteredBooks);
  },
];

// Fungsi untuk membuat buku baru
export const createBook = [
  authMiddleware,
  (req: Request, res: Response) => {
    try {
      const inputData: BookInput = req.body;

      // Validasi input
      if (
        !inputData.title ||
        !inputData.description ||
        !inputData.release_year ||
        !inputData.price ||
        !inputData.total_page ||
        !inputData.category_id
      ) {
        return res.status(400).json({ error: "Semua field harus diisi" });
      }

      // Validasi release_year
      if (inputData.release_year < 1980 || inputData.release_year > 2021) {
        return res
          .status(400)
          .json({ error: "Release year harus antara 1980 dan 2021" });
      }

      // Konversi thickness berdasarkan total_page
      if (inputData.total_page <= 100) {
        inputData.thickness = "tipis";
      } else if (inputData.total_page <= 200) {
        inputData.thickness = "sedang";
      } else {
        inputData.thickness = "tebal";
      }

      const newBook: Book = {
        id: books.length + 1,
        created_at: new Date(),
        updated_at: new Date(),
        ...inputData,
      };

      books.push(newBook);

      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  },
];

// Fungsi untuk update buku
export const updateBook = [
  authMiddleware,
  (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const bookIndex = books.findIndex((book) => book.id === parseInt(id, 10));

    if (bookIndex !== -1) {
      books[bookIndex] = { ...books[bookIndex], ...updatedData };

      res.json({ success: true, message: "Book updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Book not found" });
    }
  },
];

// Fungsi untuk menghapus buku
export const deleteBook = [
  authMiddleware,
  (req: Request, res: Response) => {
    const bookIdToDelete: number = parseInt(req.params.id, 10);

    const bookIndexToDelete = books.findIndex(
      (book) => book.id === bookIdToDelete
    );

    if (bookIndexToDelete !== -1) {
      const deletedBook = books.splice(bookIndexToDelete, 1)[0];

      res.json({ message: "Book deleted successfully", deletedBook });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  },
];
