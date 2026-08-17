import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());//Middleware to parse incoming JSON requests
app.use("/api/notes", notesRoutes);//Middleware to handle requests to /api/notes and route them to the notesRoutes
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}` );
});

