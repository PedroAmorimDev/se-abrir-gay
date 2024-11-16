import Evento from "../models/eventoModel.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

export const createEvento = async (req, res) => {
    try {
        const { nome, descricao, status } = req.body;

        const validStatuses = ["pendente", "ocorreu"];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ error: "Status inválido" });
        }

        let imagem = null;
        if (req.file) {
            imagem = req.file.filename;
        }

        const evento = await Evento.create({
            nome,
            descricao,
            status: status || 'pendente',
            imagem
        });

        res.status(201).json(evento);
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        res.status(500).json({ error: "Erro ao criar evento", details: error.message });
    }
};

export const getEventos = async (req, res) => {
    try {
        const eventos = await Evento.findAll();
        res.status(200).json(eventos);
    } catch (error) {
        console.error("Erro ao listar eventos:", error);
        res.status(500).json({ error: "Erro ao listar eventos" });
    }
};

export const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await Evento.findByPk(id);
        if (!evento) {
            return res.status(404).json({ error: "Evento não encontrado" });
        }

        if (evento.imagem) {
            const __dirname = path.dirname(fileURLToPath(import.meta.url));
            const caminhoImagem = path.join(__dirname, '..', 'uploads', evento.imagem);
            if (fs.existsSync(caminhoImagem)) {
                fs.unlinkSync(caminhoImagem);
            }
        }

        await evento.destroy();
        res.status(200).json({ message: "Evento excluído" });
    } catch (error) {
        console.error("Erro ao excluir evento:", error);
        res.status(500).json({ error: "Erro ao excluir evento" });
    }
};

export const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, status } = req.body;

        const evento = await Evento.findByPk(id);
        if (!evento) {
            return res.status(404).json({ error: "Evento não encontrado" });
        }

        evento.nome = nome || evento.nome;
        evento.descricao = descricao || evento.descricao;
        evento.status = status || evento.status;

        if (req.file) {
            if (evento.imagem) {
                const __dirname = path.dirname(fileURLToPath(import.meta.url));
                const caminhoImagemAntiga = path.join(__dirname, '..', 'uploads', evento.imagem);
                if (fs.existsSync(caminhoImagemAntiga)) {
                    fs.unlinkSync(caminhoImagemAntiga);
                }
            }
            evento.imagem = req.file.filename;
        }

        await evento.save();
        res.status(200).json(evento);
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        res.status(500).json({ error: "Erro ao atualizar evento" });
    }
};