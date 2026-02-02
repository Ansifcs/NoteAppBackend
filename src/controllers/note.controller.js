const Note = require('../models/note.model');

exports.addNote = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content required' });
    }

    const note = await Note.create({
      title,
      content,
      isPublic: !!isPublic,
      user: req.userId,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🌍 PUBLIC NOTES (dashboard default)
exports.getAllPublicNotes = async (req, res) => {
  const notes = await Note.find({ isPublic: true })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  res.json(notes);
};

// 👤 MY NOTES
exports.getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑 DELETE NOTE (OWNER ONLY)
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

