import axios from 'axios';

// Define o host padrão diretamente no código, mas permite que seja sobrescrito pela variável de ambiente
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';  // Valor padrão atribuído

//console.log("API_URL:", API_URL);  // Verifica se o valor está sendo carregado corretamente

const api = axios.create({
  baseURL: API_URL,  // Usa a URL atribuída, seja do .env ou o valor padrão
});

export default api;
