// src/api/auth/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Fungsi untuk memeriksa token dan mengautentikasi pengguna
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Mendapatkan token dari header Authorization
  const token = req.header('Authorization');

  // Memeriksa apakah token ada
  if (!token) {
    return res.status(401).json({ error: 'Tidak ada token. Autentikasi ditolak.' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, 'secret-key');

    // Menyimpan data pengguna yang diverifikasi ke dalam objek request
    req.user = decoded;

    // Melanjutkan ke middleware atau endpoint berikutnya
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token tidak valid.' });
  }
};
