import { useParams } from 'react-router-dom'; // Importa useParams
import ClientDetail from '../../../components/Client/ClientDetails';

const ClientDetailsPage = () => {
    const { id } = useParams(); // Obtém o ID da rota

    return (
        <ClientDetail id={Number(id)} />
    );
};

export default ClientDetailsPage;
