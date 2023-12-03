// src/api/categories/categories.routes.ts
import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryBooks,
} from './categories-controller';

const router = express.Router();

router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.patch('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);
router.get('/categories/:id/books', getCategoryBooks);

export default router;
