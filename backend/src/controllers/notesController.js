import Note from '../../models/Note.js';

export async function getAllNotes(req, res) {
  try {
    const userId = req.session.getUserId();

    const notes = await Note.find({ userId }).sort({ createdAt: -1 }); //newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error in getAllNotes controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// ******************************************************************
// ******************************************************************
export async function getNoteById(req, res) {
  try {
    const userId = req.session.getUserId();

    const note = await Note.findOne({ _id: req.params.id, userId });
    if (!note)
      return res.status(404).json({ message: 'Note not found!' });
    res.status(200).json(note);
  } catch (error) {
    console.error('Error in getNoteById controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// ******************************************************************
// ******************************************************************

export async function createNote(req, res) {
  try {
    const userId = req.session.getUserId();

    const { title, content } = req.body;
    const note = new Note({ title, content, userId });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error in createNote controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateNote(req, res) {
  try {
    const userId = req.session.getUserId();

    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId },
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: 'Note not found!' });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error in updateNote controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// ******************************************************************
// ******************************************************************

export async function deleteNote(req, res) {
  try {
    const userId = req.session.getUserId();

    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!deletedNote)
      return res.status(404).json({ message: 'Note not found!' });
    res.status(200).json({
      message: 'Note DELETED successfully!',
      deletedNote: deletedNote,
    });
  } catch (error) {
    console.error('Error in deleteNote controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// ******************************************************************
