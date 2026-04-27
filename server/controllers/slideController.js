const Slide = require('../models/slideModel');

exports.getAllSlides = async (req, res) => {
  try {
    const slides = await Slide.find().populate('presentationId', 'title');
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSlidesByPresentation = async (req, res) => {
  try {
    const slides = await Slide.find({ presentationId: req.params.presentationId }).sort('order');
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSlideById = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id).populate('presentationId', 'title');
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json(slide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSlide = async (req, res) => {
  const { presentationId, title, content, contentType, order } = req.body;
  if (!presentationId || !title || !content || !order) {
    return res.status(400).json({ message: 'presentationId, title, content, and order are required' });
  }
  try {
    const slide = new Slide({ presentationId, title, content, contentType, order });
    const savedSlide = await slide.save();
    res.status(201).json(savedSlide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSlide = async (req, res) => {
  const { title, content, contentType, order } = req.body;
  try {
    const slide = await Slide.findByIdAndUpdate(
      req.params.id,
      { title, content, contentType, order },
      { new: true, runValidators: true }
    );
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json(slide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json({ message: 'Slide deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};