const express = require('express');
const router = express.Router();
const presentationController = require('../controllers/presentationController');

router.get('/', presentationController.getAllPresentations);
router.get('/:id', presentationController.getPresentationById);
router.post('/', presentationController.createPresentation);
router.put('/:id', presentationController.updatePresentation);
router.delete('/:id', presentationController.deletePresentation);
router.get('/stats/total-slides', presentationController.getTotalSlides);

module.exports = router;