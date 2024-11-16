import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { createEvento, getEventos, deleteEvento, updateEvento } from "../controllers/eventoController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('imagem'), createEvento);
router.get('/', getEventos);
router.delete('/:id', deleteEvento);
router.put('/:id', upload.single('imagem'), updateEvento);

export default router;
