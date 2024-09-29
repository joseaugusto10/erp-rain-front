import DataTableClients from '../../components/Client/DataTableClients';
import Card from '../../components/Util/Card';
import { Outlet, useLocation } from 'react-router-dom'; // Importa useLocation
import './styles.css';

const ClientPage = () => {
  const location = useLocation(); // Obtém a localização atual

  return (
    <Card>
      {/* Renderiza DataTableClients apenas quando a rota atual não é "/clients/details/:id" ou "/clients/create" */}
      {!location.pathname.startsWith('/clients/details') && !location.pathname.startsWith('/clients/create') && <DataTableClients />}
      <Outlet /> {/* O Outlet aqui renderiza o componente da rota correspondente */}
    </Card>
  );
};

export default ClientPage;
