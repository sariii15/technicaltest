// src/api/categories/categories.
import { Request, Response } from 'express';
import { Category,Book } from './CategoryWithBooks';

const categories: Category[] = [];
const books: Book[] = [];

export const getAllCategories = (req: Request, res: Response) => {
  res.json(categories);
};

export const createCategory = (req: Request, res: Response) => {
  const { name } = req.body;

  // Validasi bahwa 'name' tidak boleh kosong
  if (!name) {
    return res.status(400).json({ message: 'Name is required for a category.' });
  }

  // Validasi bahwa 'name' harus unik (tidak ada kategori dengan nama yang sama)
  if (categories.some((category) => category.name === name)) {
    return res.status(400).json({ message: 'Category with this name already exists.' });
  }

  const newCategory: Category = {
    id: categories.length + 1,
    name,
    created_at: new Date(),
    updated_at: new Date(),
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);};

export const updateCategory = (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  const { name } = req.body;

  // Cari indeks kategori dalam array berdasarkan ID
  const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);

  if (categoryIndex !== -1) {
    // Update properti kategori yang diperlukan
    categories[categoryIndex].name = name;
    categories[categoryIndex].updated_at = new Date();

    // Memberikan respons dengan data kategori yang diperbarui
    res.json(categories[categoryIndex]);
  } else {
    // Jika kategori tidak ditemukan, kirim respons dengan status 404
    res.status(404).json({ message: 'Category not found' });
  }};

export const deleteCategory = (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);

  if (categoryIndex !== -1) {
    const deletedCategory = categories.splice(categoryIndex, 1);
    res.json(deletedCategory[0]);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }};

export const getCategoryBooks = (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id);
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const categoryBooks: Book[] = books.filter((book) => book.category_id === categoryId);

  res.json(categoryBooks);};
