import { Router } from 'express';
import { getAllLivros, getLivro, createLivro, createEditora, getAllEditoras, getEditora, deleteLivro, deleteEditora, updateLivro, updateEditora } from '../controllers/livroController';

const router = Router();

// GET
router.get('/livro/:id', getLivro);
router.get('/livros', getAllLivros);
router.get('/editora/:id', getEditora);
router.get('/editoras', getAllEditoras);

// POST 
router.post('/livro/new', createLivro);
router.post('/editora/new', createEditora);

// PUT 
router.put('/livro/update/:id', updateLivro);
router.put('/editora/update/:id', updateEditora);

// DELETE 
router.delete('/livro/remove/:id', deleteLivro);
router.delete('/editora/remove/:id', deleteEditora);

export default router;
