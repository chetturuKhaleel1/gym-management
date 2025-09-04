import express from 'express';
import { addDiet, getDiets,deleteDiet,
  updateDiet, } from '../controllers/dietController.js';
const router = express.Router();

router.post('/add', addDiet);
router.get('/', getDiets);
router.delete('/:id', deleteDiet);   // ✅ DELETE route
router.put('/:id', updateDiet); 

export default router;
