import mongoose from "mongoose";
/*Program to create a schema & model based on that schema for the Note model in MongoDB using Mongoose. 
The schema defines the structure of the Note documents, including the title and content fields, both of which are required strings. 
Finally, the Note model is exported for use in other parts of the application.*/


//1.Create a schema for the Note model
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},{
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

//2.Create a model based on the schema
const Note = mongoose.model("Note", noteSchema);
export default Note;  