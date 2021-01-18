import express from "express";

import * as exampleController from '../controllers/example_controller.js';

const router = express.Router();

router.get('/test',  exampleController.exampleController);

router.post('/upload-image', exampleController.uploadImage);

export default router;
