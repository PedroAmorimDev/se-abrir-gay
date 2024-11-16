import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
const EditForm = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId='tarefaEdit'>
                    <Form.Label>
                        Tarefa
                    </Form.Label>
                    <Form.Control/>
                </Form.Group>
                <Form.Group controlId='descricaoEdit'>
                    <Form.Label>
                        Descrição
                    </Form.Label>
                    <Form.Control/>
                </Form.Group>
            </Form>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditForm