import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import SuperTokens from 'supertokens-node';
import {
  middleware,
  errorHandler,
} from 'supertokens-node/framework/express';

import noteRoutes from './routes/notesRoutes.js';
import { connectDB } from '../config/db.js';
import rateLimiter from '../middleware/rateLimiter.js';

import initSuperTokens from '../config/supertokens.js';

dotenv.config();

const __dirname = path.resolve();

console.log('Current directory:', __dirname);
console.log(
  'Trying to import from:',
  path.resolve(__dirname, '../config/supertokens.js')
);

console.log('About to initialize SuperTokens...');
try {
  initSuperTokens();
  console.log('SuperTokens initialized successfully!');
} catch (error) {
  console.error('SuperTokens initialization failed:', error);
}

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      allowedHeaders: [
        'content-type',
        ...SuperTokens.getAllCORSHeaders(),
      ],
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: true,
      allowedHeaders: [
        'content-type',
        ...SuperTokens.getAllCORSHeaders(),
      ],
      credentials: true,
    })
  );
}

app.use(middleware());

app.use(express.json()); //this middleware will parse JSON bodies: req.body

app.use(rateLimiter);
// our simple custom middleware
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
});

//routes
app.use('/api/notes', noteRoutes);

//server frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '../frontend', 'dist', 'index.html')
    );
  });
}

app.use(errorHandler());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('server started om PORT:', PORT);
  });
});
