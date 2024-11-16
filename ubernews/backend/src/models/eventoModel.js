import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

const Evento = conn.define('evento', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("pendente", "ocorreu"),
        defaultValue: "pendente"
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "eventos"
});

export default Evento;