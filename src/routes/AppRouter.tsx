// src/router.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage'; // Importe o componente HomePage
import ClientPage from '../pages/ClientPage'; // Importe o componente ClientPage
import ClientDetails from '../pages/ClientPage/ClientDetailsPage'; // Importe o componente para detalhes do cliente
import CreateClient from '../pages/ClientPage/CreateClientPage'; // Importe o componente para criar cliente

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Rota para HomePage */}
        <Route path="/clients" element={<ClientPage />}>
          <Route path="details/:id" element={<ClientDetails />} /> {/* Subrota para detalhes do cliente */}
          <Route path="create" element={<CreateClient />} /> {/* Subrota para criar cliente */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
