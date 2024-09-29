// src/components/Util/AddBtn.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; // Certifique-se de criar o arquivo CSS

interface AddBtnProps {
  onClick: () => void; // Função a ser chamada ao clicar no botão
}

const AddBtn: React.FC<AddBtnProps> = ({ onClick }) => {
  return (
    <button className="add-btn" onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
};

export default AddBtn;
