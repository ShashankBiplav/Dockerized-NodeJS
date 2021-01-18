import path from 'path';

//installed modules
import express from 'express';

import multer from 'multer';

const port = process.env.PORT || 3300;

const app = express();

// All routes imported here
import exampleRoutes from './routes/example_routes.js';

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('image'));


//defining absolute path of current WORKDIR
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());

//cors error function
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Entry point for routes
app.use('/api', exampleRoutes);

//central error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});
