import { Request, Response } from 'express';
import db from '../db/db';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.any('SELECT * FROM users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};
