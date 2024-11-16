import React from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { BsFillTrash3Fill } from "react-icons/bs";

const TodoList = ({ eventos, onDelete }) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/api/eventos/${id}`);
      onDelete(id); // Atualiza a lista de eventos após a exclusão
    } catch (error) {
      console.error("Erro ao excluir evento", error);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome do Evento</th>
          <th>Descrição</th>
          <th>Status</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {eventos.map((evento) => (
          <tr key={evento.id}>
            <td>{evento.nome}</td>
            <td>{evento.descricao}</td>
            <td>{evento.status}</td>
            <td>
              <Button variant="danger" onClick={() => handleDelete(evento.id)}>
                <BsFillTrash3Fill />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TodoList;
