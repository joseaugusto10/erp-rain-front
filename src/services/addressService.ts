import api from '../api';
import { Address } from '../types/address';
import { AxiosError } from 'axios'; // Importe AxiosError para fazer a verificação

/**
 * Faz uma requisição à API para buscar endereços paginados e filtrados.
 * @param {number} page - O número da página a ser buscada.
 * @param {number} size - O número de endereços por página.
 * @param {string} searchTerm - O termo de busca para filtrar os endereços (opcional).
 */
export const getAddresses = async (page: number, size: number, searchTerm: string = '') => {
  try {
    const response = await api.get<{ content: Address[], totalPages: number }>(
      '/addresses',
      {
        params: {
          page: page,
          size: size,
          searchTerm: searchTerm || '' // Envia o termo de pesquisa ou vazio se não houver
        }
      }
    );
    return response.data; // Retorna os dados da API (endereços paginados e filtrados)
  } catch (error) {
    // Verifica se o erro é um AxiosError
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data || error.message}`);
    } else {
      throw new Error('Erro desconhecido ao buscar endereços');
    }
  }
};

/**
 * Cria um novo endereço.
 */
export const createAddress = async (address: Address) => {
  try {
    const response = await api.post<Address>('/addresses', address);
    return response.data;
  } catch (error) {
    // Verifica se o erro é um AxiosError
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data || error.message}`);
    } else {
      throw new Error('Erro desconhecido ao criar o endereço');
    }
  }
};

/**
 * Atualiza um endereço na API.
 * @param {number} id - O ID do endereço a ser atualizado.
 * @param {Address} updatedAddress - Os dados atualizados do endereço.
 */
export const updateAddress = async (id: number, updatedAddress: Address) => {
  try {
    const response = await api.put(`/addresses/${id}`, updatedAddress);
    return response.data; // Retorna os dados atualizados
  } catch (error) {
    // Verifica se o erro é um AxiosError
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data || error.message}`);
    } else {
      throw new Error('Erro desconhecido ao atualizar o endereço');
    }
  }
};

/**
 * Deleta um endereço na API.
 * @param {number} id - O ID do endereço a ser deletado.
 */
export const deleteAddress = async (id: number) => {
  try {
    await api.delete(`/addresses/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar o endereço:`, error);
    
    // Verifica se o erro é um AxiosError
    if (error instanceof AxiosError) {
      throw new Error(`${error.response?.data || error.message}`);
    } else {
      throw new Error('Erro desconhecido ao deletar o endereço');
    }
  }
};
