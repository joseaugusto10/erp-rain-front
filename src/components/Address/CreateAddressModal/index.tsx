// src/components/Address/CreateAddressModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Address } from '../../../types/address';
import Notification from '../../Notification'; // Importe o componente de Notificação
import Loader from '../../Util/Loader'; // Importa o componente Loader
import './styles.css';

interface CreateAddressModalProps {
  show: boolean;
  handleClose: () => void;
  handleCreateAddress: (address: Address) => void;
}

const CreateAddressModal: React.FC<CreateAddressModalProps> = ({ show, handleClose, handleCreateAddress }) => {
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Estado para controle de carregamento
  const [showNotification, setShowNotification] = useState<boolean>(false); // Estado para controle de notificação

  useEffect(() => {
    // Limpa os campos quando o modal é fechado
    if (!show) {
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
      setCountry('');
      setShowNotification(false); // Limpa a notificação ao fechar
    }
  }, [show]);

  const handleSubmit = async () => {
    const newAddress: Address = { street, city, state, zipCode, country };
    setLoading(true); // Começa o carregamento

    try {
      await handleCreateAddress(newAddress);
      setShowNotification(true); // Exibe a notificação de sucesso
      handleClose(); // Fecha o modal após salvar
    } catch (error) {
      console.error('Erro ao criar endereço:', error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false); // Fecha a notificação
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" className="create-update-modal">
        <Modal.Header closeButton>
          <Modal.Title>Criar Novo Endereço</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loader /> // Exibe o Loader durante o carregamento
          ) : (
            <Form>
              <Form.Group controlId="formStreet">
                <Form.Label>Rua</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a rua"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formState">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o estado"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formZipCode">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o CEP"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCountry">
                <Form.Label>País</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o país"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="cancel-btn" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className="save-btn" onClick={handleSubmit} disabled={loading}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {showNotification && (
        <Notification
          message="Endereço criado com sucesso!"
          type="success"
          duration={3000}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
};

export default CreateAddressModal;
