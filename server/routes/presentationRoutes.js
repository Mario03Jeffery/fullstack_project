import express from 'express';
import * as presentationController from '../controllers/presentationController.js';

const router = express.Router();

router.get('/', presentationController.getAllPresentations);
router.get('/:id', presentationController.getPresentationById);
router.post('/', presentationController.createPresentation);
router.put('/:id', presentationController.updatePresentation);
router.delete('/:id', presentationController.deletePresentation);
router.get('/stats/total-slides', presentationController.getTotalSlides);

export default router;
