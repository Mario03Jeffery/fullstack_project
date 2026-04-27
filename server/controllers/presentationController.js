import Presentation from '../models/presentationModel.js';
import Slide from '../models/slideModel.js';

export const getAllPresentations = async (req, res) => {
  try {
    const { user } = req.query;
    const query = user ? { userId: user } : {};
    const presentations = await Presentation.find(query).populate('userId', 'name email');
    res.json(presentations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPresentationById = async (req, res) => {
  try {
    const presentation = await Presentation.findById(req.params.id).populate('userId', 'name email');
    if (!presentation) return res.status(404).json({ message: 'Presentation not found' });
    res.json(presentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPresentation = async (req, res) => {
  const { title, description, userId, theme } = req.body;
  if (!title || !userId) {
    return res.status(400).json({ message: 'Title and userId are required' });
  }
  try {
    const presentation = new Presentation({ title, description, userId, theme });
    const savedPresentation = await presentation.save();
    res.status(201).json(savedPresentation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePresentation = async (req, res) => {
  const { title, description, theme } = req.body;
  try {
    const presentation = await Presentation.findByIdAndUpdate(
      req.params.id,
      { title, description, theme, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!presentation) return res.status(404).json({ message: 'Presentation not found' });
    res.json(presentation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePresentation = async (req, res) => {
  try {
    const presentation = await Presentation.findByIdAndDelete(req.params.id);
    if (!presentation) return res.status(404).json({ message: 'Presentation not found' });
    res.json({ message: 'Presentation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTotalSlides = async (req, res) => {
  try {
    const result = await Slide.aggregate([
      { $group: { _id: '$presentationId', count: { $sum: 1 } } },
      { $group: { _id: null, totalSlides: { $sum: '$count' } } }
    ]);
    res.json({ totalSlides: result[0]?.totalSlides || 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};