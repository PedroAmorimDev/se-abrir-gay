// src/components/Cadastro.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');
  const [imagem, setImagem] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setImagem(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('status', status);
    if (imagem) formData.append('imagem', imagem);

    try {
      const response = await axios.post('http://localhost:3333/api/eventos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Evento cadastrado com sucesso!');
      setNome('');
      setDescricao('');
      setStatus('pendente');
      setImagem(null);
    } catch (error) {
      console.error('Erro ao cadastrar evento:', error.response || error);
      setMessage('Erro ao cadastrar evento');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nome">
        <Form.Label>Nome do Evento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nome do evento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="descricao">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          type="text"
          placeholder="Descrição do evento"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pendente">Pendente</option>
          <option value="ocorreu">Ocorreu</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="imagem">
        <Form.Label>Imagem</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Cadastrar Evento
      </Button>
      
      {message && <p>{message}</p>}
    </Form>
  );
};

export default Cadastro;
