import express from 'express';
import * as slideController from '../controllers/slideController.js';

const router = express.Router();

router.get('/', slideController.getAllSlides);
router.get('/presentation/:presentationId', slideController.getSlidesByPresentation);
router.get('/:id', slideController.getSlideById);
router.post('/', slideController.createSlide);
router.put('/:id', slideController.updateSlide);
router.delete('/:id', slideController.deleteSlide);

export default router;
