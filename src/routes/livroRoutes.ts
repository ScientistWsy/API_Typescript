import { Router } from 'express';
import { getAllLivros, getLivro } from '../controllers/livroController';

const router = Router();

router.get('/livros', getAllLivros);
router.get('/livro/:id', getLivro);
    
export default router;
