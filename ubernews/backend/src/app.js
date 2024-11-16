import express from "express";
import cors from "cors";
import conn from "./config/conn.js";
import Evento from "./models/eventoModel.js";
import eventoRouter from "./routes/eventoRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/eventos', eventoRouter);

conn
    .sync()
    .then(() => {
        console.log("Conectado!");
    })
    .catch((error) => console.error(error));

app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

export default app;
