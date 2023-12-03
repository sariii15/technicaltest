// src/index.ts
import express from 'express';
import categoriesRouter from './pages/api/users/Category/categories-routes';
import booksRouter from './pages/api/users/books/books.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca JSON dari body request
app.use(express.json());

app.use('/api', categoriesRouter);
app.use('/api', booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
