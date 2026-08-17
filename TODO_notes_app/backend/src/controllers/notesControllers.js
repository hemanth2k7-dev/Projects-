import Note from "../../model/Note.js";

//Logic for handling requests related to notes
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();//find() is a method provided by Mongoose to retrieve all documents from the Note collection in the database
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller:", error);
    res.status(500).json({ message: 'Error retrieving notes!'});
  }
}//Controller

export async function createNote(req, res) {
  try {
    const {title,content} = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();//save() is a method provided by Mongoose to save the document to the database
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote controller:", error);
    res.status(500).json({ message: 'Error creating note!' });
  }
}

export async function updateNoteById(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found!' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNoteById controller:", error);
    res.status(500).json({ message: 'Error updating note!' });
  }
}

export async  function deleteNoteById(req, res) {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found!' });
    }
    res.status(200).json({ message: 'Note deleted successfully!' });
  } catch (error) {
    console.log("Error in deleteNoteById controller:", error);
    res.status(500).json({ message: 'Error deleting note!' });
  }
}