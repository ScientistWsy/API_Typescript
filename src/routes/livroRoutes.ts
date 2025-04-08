import { Router } from 'express';
import { getAllLivros, getLivro, createLivro, createEditora, getAllEditoras, getEditora, deleteLivro, deleteEditora, updateLivro, updateEditora } from '../controllers/livroController';

const router = Router();

// GET
router.get('/livro/:id', getLivro);
router.get('/livros', getAllLivros);
router.get('/Editora/:id', getEditora);
router.get('/Editoras', getAllEditoras);

// POST 
router.post('/livro/new', createLivro);
router.post('/editora/new', createEditora);

// PUT 
router.put('/livro/update', updateLivro);
router.put('/editora/update', updateEditora);

// DELETE 
router.delete('/livro/remove', deleteLivro);
router.delete('/editora/remove', deleteEditora);

export default router;
