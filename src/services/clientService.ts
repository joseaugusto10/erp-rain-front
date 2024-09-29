import api from '../api'; // Importa o Axios configurado
import { Client } from '../types/client';
import { AxiosError } from 'axios'; // Importe AxiosError para fazer a verificação

/**
 * Faz uma requisição à API para buscar clientes paginados.
 * @param {number} page - O número da página a ser buscada.
 * @param {number} size - O número de clientes por página.
 * @param {string} searchTerm - O termo de busca para filtrar os clientes (opcional).
 */
export const getClients = async (page: number, size: number, searchTerm: string = '') => {
  try {
    const response = await api.get<{ content: Client[], totalPages: number }>(
      '/clients',
      {
        params: {
          page: page,
          size: size,
          searchTerm: searchTerm || '' // Envia o termo de pesquisa ou vazio se não houver
        }
      }
    );
    return response.data; // Retorna os dados da API (clientes paginados e filtrados)
  } catch (error) {
    // Verifica se o erro é um AxiosError
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data || error.message}`);
    } else {
      throw new Error('Erro desconhecido ao buscar os clientes');
    }
  }
};

/**
 * Faz uma requisição à API para buscar um cliente pelo ID.
 * @param {number} id - O ID do cliente a ser buscado.
 * @returns {Promise<Client>} - Retorna os dados do cliente.
 */
export const getClientById = async (id: number): Promise<Client> => {
  try {
    const response = await api.get<Client>(`/clients/${id}`);
    return response.data; // Retorna os dados do cliente
  } catch (error) {
    // Verifica se o erro é um AxiosError
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data || error.message}`);
    } else {
      throw new Error('Erro desconhecido ao buscar o cliente');
    }
  }
};

/**
 * Faz uma requisição à API para atualizar os dados de um cliente.
 * @param {number} id - O ID do cliente a ser atualizado.
 * @param {Client} client - Os dados atualizados do cliente.
 * @returns {Promise<Client>} - Retorna os dados atualizados do cliente.
 */
export const updateClient = async (id: number, client: Client): Promise<Client> => {
  try {
    const response = await api.put<Client>(`/clients/${id}`, client);
    return response.data; // Retorna os dados atualizados do cliente
  } catch (error) {
    // Verifica se o erro é um AxiosError
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data || error.message}`);
    } else {
      throw new Error('Erro desconhecido ao atualizar o cliente');
    }
  }
};

/**
 * Deleta um cliente na API.
 * @param {number} id - O ID do cliente a ser deletado.
 */
export const deleteClient = async (id: number) => {
  try {
    await api.delete(`/clients/${id}`);
  } catch (error) {
    // Verifica se o erro é um AxiosError
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data || error.message}`);
    } else {
      throw new Error('Erro desconhecido ao deletar o cliente');
    }
  }
};
