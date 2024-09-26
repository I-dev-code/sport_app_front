//Dashboard page
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    
    const handleLogout = () => {
        //supprimer le token jwt
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Tableau de bord
            </Typography>
            <Typography align="center">
                Bienvenue sur le Tableau de bord de l'application
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
                Se déconnecter
            </Button>
        </Container>
    );
};

export default DashboardPage;