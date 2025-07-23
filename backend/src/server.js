import express from 'express';
import noteRoutes from './routes/notesRoutes.js';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
//middleware
app.use(express.json()); //this middleware wilt parse JSON bodies: req.body

/* our simple custom middleware
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
});*/

app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log('server started om PORT:', PORT);
});
