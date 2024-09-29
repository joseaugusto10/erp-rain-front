// src/components/Loader/Loader.tsx
import React from 'react';
import './styles.css';
import { RingLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <RingLoader
        size={100} // Tamanho do carregador
        color="#007bff" // Cor do carregador (azul)
        speedMultiplier={1} // Controla a velocidade da animação
        cssOverride={{
          display: 'block', // Para garantir que o carregador esteja centralizado
          margin: '0 auto', // Centraliza horizontalmente
        }}
      />
    </div>
  );
};

export default Loader;
