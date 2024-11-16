import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Lista = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/eventos');
        setEventos(response.data);
      } catch (error) {
        console.error('Erro ao listar eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  // Só exibe o console se houver dados em eventos
  if (eventos.length > 0) {
    console.log(eventos[0].imagem);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/api/eventos/${id}`);
      setEventos(eventos.filter(evento => evento.id !== id));
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Status</th>
          <th>Imagem</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.nome}</td>
              <td>{evento.descricao}</td>
              <td>{evento.status}</td>
              <td>
                {evento.imagem ? (
                  <img
                    src={`http://localhost:3333/uploads/${evento.imagem}`}
                    alt={evento.nome}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ) : (
                  <span>Imagem não disponível</span>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(evento.id)}>Excluir</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">Nenhum evento disponível</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default Lista;
