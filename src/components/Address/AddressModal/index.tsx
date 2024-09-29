// src/components/Address/AddressModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAddresses, createAddress, updateAddress, deleteAddress } from '../../../services/addressService';
import { Address } from '../../../types/address';
import CreateAddressModal from '../CreateAddressModal';
import UpdateAddressModal from '../UpdateAddressModal';
import Notification from '../../Notification';
import Loader from '../../Util/Loader'; // Importa o componente Loader
import AddBtn from '../../Util/AddBtn'; // Importe o novo componente AddBtn
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface AddressModalProps {
  show: boolean;
  handleClose: () => void;
  onSelectAddress: (address: Address) => void; // Função para selecionar o endereço
}

const AddressModal: React.FC<AddressModalProps> = ({ show, handleClose, onSelectAddress }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addressesPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null); // Estado da notificação

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await getAddresses(currentPage - 1, addressesPerPage, searchTerm);
        setAddresses(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [currentPage, addressesPerPage, searchTerm]);

  // Limpa os inputs ao fechar o modal
  useEffect(() => {
    if (!show) {
      setSearchTerm(''); // Limpa o campo de pesquisa
      setSelectedAddress(null); // Limpa o endereço selecionado
    }
  }, [show]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Função para adicionar um novo endereço
  const handleCreateAddress = async (address: Address) => {
    try {
      await createAddress(address);
      setAddresses([address, ...addresses]);
      setNotification({ message: 'Endereço criado com sucesso!', type: 'success' });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      setNotification({ message: 'Erro ao criar endereço: ' + errMsg, type: 'error' });
      console.error('Erro ao criar endereço:', error);
    }
  };

  // Função para atualizar um endereço
  const handleUpdateAddress = async (updatedAddress: Address) => {
    try {
      if (updatedAddress.id !== undefined) {
        await updateAddress(updatedAddress.id, updatedAddress);
        setAddresses(
          addresses.map((address) =>
            address.id === updatedAddress.id ? updatedAddress : address
          )
        );
        setNotification({ message: 'Endereço atualizado com sucesso!', type: 'success' });
      } else {
        console.error("Endereço inválido. ID ausente.");
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      setNotification({ message: 'Erro ao atualizar endereço: ' + errMsg, type: 'error' });
      console.error("Erro ao atualizar o endereço:", error);
    }
  };

  // Função para excluir um endereço
  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id);
      setAddresses(addresses.filter(address => address.id !== id)); // Remove o endereço da lista
      setNotification({ message: 'Endereço deletado com sucesso!', type: 'success' });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      setNotification({ message: 'Erro ao deletar endereço: ' + errMsg, type: 'error' });
      console.error('Erro ao deletar endereço:', error);
    }
  };

  // Adiciona a função de selecionar endereço
  const handleRowClick = (address: Address) => {
    onSelectAddress(address); // Passa o endereço selecionado para o ClientDetails
    handleClose(); // Fecha o modal
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Endereços</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="search-add-container">
            <Form.Control
              type="text"
              placeholder="Pesquisar Endereços"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {/* Mantém a classe add-btn no botão de adição */}
            <AddBtn onClick={() => setShowAddModal(true)} />
          </div>

          {loading ? (
            <Loader /> // Exibe o Loader enquanto os endereços estão sendo carregados
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Rua</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>CEP</th>
                  <th>País</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((address) => (
                  <tr key={address.id} onClick={() => handleRowClick(address)} style={{ cursor: 'pointer' }}>
                    <td>{address.street}</td>
                    <td>{address.city}</td>
                    <td>{address.state}</td>
                    <td>{address.zipCode}</td>
                    <td>{address.country}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que o clique na edição selecione a linha
                          setSelectedAddress(address);
                          setShowUpdateModal(true);
                        }}
                        className="edit-icon"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que o clique na lixeira selecione a linha
                          if (address.id !== undefined) {
                            handleDeleteAddress(address.id);
                          }
                        }}
                        className="delete-icon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="pagination-container">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page + 1 ? 'active' : ''}`}
                onClick={() => paginate(page + 1)}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para criar novo endereço */}
      <CreateAddressModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleCreateAddress={handleCreateAddress}
      />

      {/* Modal para editar endereço */}
      <UpdateAddressModal
        show={showUpdateModal}
        address={selectedAddress}
        handleClose={() => setShowUpdateModal(false)}
        handleUpdateAddress={handleUpdateAddress}
      />

      {/* Notificação */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default AddressModal;
