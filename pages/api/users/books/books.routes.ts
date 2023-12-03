import express from 'express';
import { getAllBooks, createBook, updateBook, deleteBook } from './books-controller';

const router = express.Router();

router.get('/books', getAllBooks);
router.post('/books', createBook);
router.patch('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;
