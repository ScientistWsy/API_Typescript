import { Request, Response } from 'express';
import db from '../db/db';
import Livro from '../models/Livro';
import Editora from '../models/Editora';

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

// Busca a editora pelo ID
export const getEditora = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!(id > 0)) {
    res.status(400).json({ message: "ID da editora inválido" });
    return;
  }

  try {
    const editora: Editora | null = await db.oneOrNone(`
      SELECT 
        Id,
        Nome,
        Cidade
      FROM Editora
      WHERE Id = $1
    `, [id]);

    if (!editora) {
      res.status(404).json({ message: 'Editora não encontrado' });
      return;
    }
    res.status(200).json(editora);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a editora', error });
  }
};

// Retorna todas as editoras
export const getAllEditoras = async (req: Request, res: Response) => {
  try {
    const editoras: Editora[] = await db.any(`
      SELECT Id, Nome, Cidade FROM Editora 
    `);
    res.status(200).json(editoras);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar as editoras', error });
  }
};

// Cria um novo livro
export const createLivro = async (req: Request, res: Response) => {
  const livro: Livro = req.body;

  if (
    !livro.Titulo ||
    !livro.Autor ||
    !livro.ISBN ||
    !livro.AnoDePublicacao ||
    !livro.Editora.Id
  ) {
    res.status(400).json({ message: 'Campos obrigatórios ausentes ou inválidos' });
    return;
  }  

  try {
    await db.none(`
      INSERT INTO Livro (Titulo, Autor, ISBN, AnoDePublicacao, Editora)
      VALUES ($1, $2, $3, $4, $5)
      `, [livro.Titulo, livro.Autor, livro.ISBN, livro.AnoDePublicacao, livro.Editora.Id]);

    res.status(201).json({ message: 'Livro criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar livro', error });
  }
}

// Cria uma nova editora
export const createEditora = async (req: Request, res: Response) => {
  const editora: Editora = req.body;

  if (!editora.Nome || !editora.Cidade)  {
    res.status(400).json({ message: 'Campos obrigatórios ausentes ou inválidos' });
    return;
  }

  try {
    await db.none(`
      INSERT INTO Editora (Nome, Cidade)
      VALUES ($1, $2)`, [editora.Nome, editora.Cidade]);

    res.status(201).json({ message: 'Editora criada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar editora', error });
  }
}

// Atualizar Livro
export const updateLivro = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const livro: Livro = req.body;

  // Validação básica
  if (
    !id ||
    !livro.Titulo ||
    !livro.Autor ||
    !livro.ISBN ||
    !livro.AnoDePublicacao ||
    !livro.Editora?.Id
  ) {
    res.status(400).json({ message: 'Campos obrigatórios ausentes ou inválidos' });
    return;
  }

  try {
    const result = await db.result(`
      UPDATE Livro
      SET Titulo = $1,
          Autor = $2,
          ISBN = $3,
          AnoDePublicacao = $4,
          EditoraId = $5
      WHERE Id = $6
    `, [
      livro.Titulo,
      livro.Autor,
      livro.ISBN,
      livro.AnoDePublicacao,
      livro.Editora.Id,
      id
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Livro não encontrado' });
      return;
    }

    res.status(200).json({ message: 'Livro atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).json({ message: 'Erro ao atualizar livro', error });
  }
};

// Atualizar Editora
export const updateEditora = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const editora: Editora = req.body;

  if (
    !id ||
    !editora.Nome ||
    !editora.Cidade
  ) {
    res.status(400).json({ message: 'Campos obrigatórios ausentes ou inválidos' });
    return;
  }

  try {
    const result = await db.result(`
      UPDATE Editora SET Nome = $1, Cidade = $2 WHERE Id = $3
    `, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Editora não encontrada' });
      return;
    }

    res.status(200).json({ message: 'Editora atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar editora:', error);
    res.status(500).json({ message: 'Erro ao atualizar editora', error });
  }
};

// Delete Livro
export const deleteLivro = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!(id > 0)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }

  try {
    const result = await db.result(`
      DELETE FROM Livro WHERE Id = $1
    `, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Livro não encontrado' });
      return;
    }

    res.status(200).json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar livro', error });
  }
};

// Delete Editora
export const deleteEditora = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!(id > 0)) {
    res.status(400).json({ message: 'ID inválido' });
    return;
  }

  try {
    const result = await db.result(`
      DELETE FROM Editora WHERE Id = $1
    `, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Editora não encontrada' });
      return 
    }

    res.status(200).json({ message: 'Editora deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar editora', error });
  }
};
