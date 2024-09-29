// src/components/Client/DataTableClients.tsx
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { getClients } from '../../../services/clientService';
import { Client } from '../../../types/client';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Loader from '../../Util/Loader'; // Importa o componente Loader

const DataTableClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [clientsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

  const navigate = useNavigate(); // Cria a instância do useNavigate

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await getClients(currentPage - 1, clientsPerPage, debouncedSearchTerm);
        setClients(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setLoading(false);
      }
    };

    fetchClients();
  }, [currentPage, clientsPerPage, debouncedSearchTerm]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleViewDetails = (id: number) => {
    navigate(`details/${id}`); // Navega para a rota de detalhes do cliente
  };

  if (loading) {
    return <Loader />; // Exibe o Loader enquanto os dados estão sendo carregados
  }

  return (
    <div className="main-container">
      <div className="search-table">
        <span className="search-container">
          <FontAwesomeIcon icon={faSearch} className="fa-search" />
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </span>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="client-avatar"
                  />
                </td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{`${client.address.street}, ${client.address.city}, ${client.address.state}, ${client.address.zipCode}, ${client.address.country}`}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="view-icon"
                    onClick={() => handleViewDetails(client.id)} // Chama a função para navegar
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
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
    </div>
  );
};

export default DataTableClients;
