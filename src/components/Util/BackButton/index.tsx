import React from 'react';
import './styles.css'; // Importe seu CSS

interface BackButtonProps {
  onBack: () => void; // Função para lidar com a navegação de volta
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button className="back-button" onClick={onBack}>
      Voltar
    </button>
  );
};

export default BackButton;
