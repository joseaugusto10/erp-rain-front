import './styles.css';


interface CardProps {
    children: React.ReactNode; // Define que o `children` pode ser qualquer nó do React
  }

  const Card: React.FC<CardProps> = ({ children }) => {
    return (
      <div className="card-container">
        {children} {/* Renderiza o conteúdo passado como `children` */}
      </div>
    );
  }
  
  export default Card;