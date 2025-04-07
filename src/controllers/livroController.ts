import { Request, Response } from 'express';
import db from '../db/db';
import Livro from '../models/Livro';

// Retorna todos os livros e sua respectiva editora
export const getAllLivros = async (req: Request, res: Response) => {
  try {
    const livros: Livro[] = await db.any(`
      SELECT 
        l.Id AS "Id", 
        l.Titulo AS "Titulo", 
        l.Autor AS "Autor", 
        l.ISBN AS "ISBN", 
        l.AnoDePublicacao AS "AnoDePublicacao",
        json_build_object(
          'Id', e.Id,
          'Nome', e.Nome,
          'Cidade', e.Cidade
        ) AS "Editora"
      FROM Livro l
      JOIN Editora e ON l.EditoraId = e.Id
    `);
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar livros', error });
  }
};

// Busca um único livro pelo ID
export const getLivro = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!(id > 0)) {
    res.status(400).json({ message: "ID de livro inválido" });
    return;
  }

  try {
    const livro: Livro | null = await db.oneOrNone(`
      SELECT 
        l.Id AS "Id", 
        l.Titulo AS "Titulo", 
        l.Autor AS "Autor", 
        l.ISBN AS "ISBN", 
        l.AnoDePublicacao AS "AnoDePublicacao",
        json_build_object(
          'Id', e.Id,
          'Nome', e.Nome,
          'Cidade', e.Cidade
        ) AS "Editora"
      FROM Livro l
      JOIN Editora e ON l.EditoraId = e.Id
      WHERE l.Id = $1
    `, [id]);

    if (!livro) {
      res.status(404).json({ message: 'Livro não encontrado' });
      return;
    }
    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o livro', error });
  }
};
