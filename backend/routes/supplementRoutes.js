import express from 'express';
import { addSupplement, getSupplements,deleteSupplement,updateSupplement } from '../controllers/supplementController.js';
const router = express.Router();

router.post('/add', addSupplement);
router.get('/', getSupplements);
router.delete('/:id', deleteSupplement);

router.put('/:id', updateSupplement);

export default router;
