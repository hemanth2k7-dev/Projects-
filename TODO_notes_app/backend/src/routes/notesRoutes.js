import express from "express";
import {getAllNotes,updateNoteById,deleteNoteById,createNote} from "../controllers/notesControllers.js";

const router = express.Router();//create a router instance

router.get('/', getAllNotes);//route to get notes

router.post('/', createNote);//route to create a new note

router.put('/:id', updateNoteById);//route to update a note

router.delete('/:id', deleteNoteById);//route to delete a note

export default router;