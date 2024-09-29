import React, { useEffect, useState, useCallback } from 'react';
import { getClientById, updateClient, deleteClient } from '../../../services/clientService';
import { Client } from '../../../types/client';
import { Address } from '../../../types/address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import BackButton from '../../Util/BackButton'; // Importe o componente de botão de voltar
import './styles.css'; // Importa o arquivo de estilos
import AddressModal from '../../Address/AddressModal'; // Importa o modal de endereços
import Notification from '../../Notification'; // Importa o componente de notificação
import Loader from '../../Util/Loader'; // Importa o componente Loader
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

interface ClientDetailProps {
  id: number;
}

const ClientDetail: React.FC<ClientDetailProps> = ({ id }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false); // Estado para editar avatar
  
  const [editName, setEditName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editPhone, setEditPhone] = useState<string>('');
  const [editAvatar, setEditAvatar] = useState<string>(''); // Estado para avatar

  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const navigate = useNavigate(); 

  const fetchClient = useCallback(async () => {
    try {
      const data = await getClientById(id);
      setClient(data);
      setLoading(false);
      setEditName(data.name);
      setEditEmail(data.email);
      setEditPhone(data.phone);
      setEditAvatar(data.avatar); // Definir avatar
      setEditAddress(data.address);
      setNotificationMessage('Cliente carregado com sucesso!');
      setNotificationType('success');
      setShowNotification(true);
    } catch (error) {
      setLoading(false);
      setNotificationMessage('Erro ao carregar os detalhes do cliente.');
      setNotificationType('error');
      setShowNotification(true);
    }
  }, [id]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  const handleSelectAddress = (address: Address) => {
    setEditAddress(address); 
  };

  const handleOpenAddressModal = () => setShowAddressModal(true);
  const handleCloseAddressModal = async () => {
    setShowAddressModal(false);
  };

  const handleUpdateClient = async () => {
    if (client && editAddress) {
      setUpdating(true);
      try {
        const updatedClient = {
          ...client,
          name: editName,
          email: editEmail,
          phone: editPhone,
          avatar: editAvatar, // Atualizar avatar
          address: editAddress,
        };
        await updateClient(client.id, updatedClient);
        setIsEditingName(false);
        setIsEditingEmail(false);
        setIsEditingPhone(false);
        setIsEditingAvatar(false); // Sair do modo de edição de avatar
        setNotificationMessage('Cliente atualizado com sucesso!');
        setNotificationType('success');
        setShowNotification(true);
      } catch (error) {
        setNotificationMessage('Erro ao atualizar o cliente.');
        setNotificationType('error');
        setShowNotification(true);
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleDeleteClient = async () => {
    if (client) {
      setDeleting(true);
      try {
        await deleteClient(client.id);
        setNotificationMessage('Cliente deletado com sucesso!');
        setNotificationType('success');
        setShowNotification(true);
        navigate(-1);
      } catch (error) {
        setNotificationMessage('Erro ao deletar o cliente.');
        setNotificationType('error');
        setShowNotification(true);
      } finally {
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!client) {
    return <div className="error-message">Client not found</div>;
  }

  return (
    <div className="client-detail-container">
      <div className="client-header">
        {isEditingAvatar ? (
          <input 
            type="text" 
            value={editAvatar} 
            onChange={(e) => setEditAvatar(e.target.value)} 
            className="edit-input"
          />
        ) : (
          <img src={editAvatar} alt={client.name} className="client-avatar-large" />
        )}
        <FontAwesomeIcon
          icon={faEdit}
          className="avatar-edit-icon"
          onClick={() => setIsEditingAvatar(!isEditingAvatar)}
        />
        <h1 className="client-name">
          {isEditingName ? (
            <input 
              type="text" 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)} 
              className="edit-input"
            />
          ) : (
            editName
          )}
          <FontAwesomeIcon
            icon={faEdit}
            className="edit-icon"
            onClick={() => setIsEditingName(!isEditingName)}
          />
        </h1>
      </div>

      <div className="client-info">
        <h2>Contact Information</h2>
        <div className="info-row">
          <label>Email:</label>
          <span>
            {isEditingEmail ? (
              <input 
                type="email" 
                value={editEmail} 
                onChange={(e) => setEditEmail(e.target.value)} 
                className="edit-input"
              />
            ) : (
              editEmail
            )}
            <FontAwesomeIcon
              icon={faEdit}
              className="edit-icon"
              onClick={() => setIsEditingEmail(!isEditingEmail)}
            />
          </span>
        </div>
        <div className="info-row">
          <label>Phone:</label>
          <span>
            {isEditingPhone ? (
              <input 
                type="text" 
                value={editPhone} 
                onChange={(e) => setEditPhone(e.target.value)} 
                className="edit-input"
              />
            ) : (
              editPhone
            )}
            <FontAwesomeIcon
              icon={faEdit}
              className="edit-icon"
              onClick={() => setIsEditingPhone(!isEditingPhone)}
            />
          </span>
        </div>
      </div>

      <div className="client-address">
        <h2>
          Address 
          <FontAwesomeIcon
            icon={faEdit}
            className="edit-icon"
            onClick={handleOpenAddressModal}
          />
        </h2>
        {editAddress && (
          <div>
            <div className="info-row">
              <label>Street:</label>
              <span>{editAddress.street}</span>
            </div>
            <div className="info-row">
              <label>City:</label>
              <span>{editAddress.city}</span>
            </div>
            <div className="info-row">
              <label>State:</label>
              <span>{editAddress.state}</span>
            </div>
            <div className="info-row">
              <label>Zip Code:</label>
              <span>{editAddress.zipCode}</span>
            </div>
            <div className="info-row">
              <label>Country:</label>
              <span>{editAddress.country}</span>
            </div>
          </div>
        )}
      </div>

      <AddressModal show={showAddressModal} handleClose={handleCloseAddressModal} onSelectAddress={handleSelectAddress} />

      <div className="update-container">
        <BackButton onBack={() => window.history.back()} />
        <button className="delete-btn" onClick={handleDeleteClient} disabled={deleting}>
          {deleting ? <Loader /> : "Deletar Cliente"}
        </button>
        <button className="update-btn" onClick={handleUpdateClient} disabled={updating}>
          {updating ? <Loader /> : "Atualizar Cliente"}
        </button>
      </div>

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          duration={3000}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default ClientDetail;
