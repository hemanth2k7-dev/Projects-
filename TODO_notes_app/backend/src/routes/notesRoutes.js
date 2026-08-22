import express from "express";
import {getAllNotes,updateNoteById,deleteNoteById,createNote,getNoteById} from "../controllers/notesControllers.js";

const router = express.Router();//create a router instance

router.get('/', getAllNotes);//route to get notes

router.get('/:id',getNoteById);//route to get a note by id

router.post('/', createNote);//route to create a new note

router.put('/:id', updateNoteById);//route to update a note

router.delete('/:id', deleteNoteById);//route to delete a note

export default router;