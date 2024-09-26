// src/page/LoginPage.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //appel a l'api back pour le login
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, motDePasse: password}),
            });
            
            if (response.ok) {
                const data = await response.json();
                //stocker le jwt 
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);

                //redirect to home
                navigate('/dashboard');
            } else {
                const error = await response.text();
                alert('Erreur: ' + error);
            }
        } catch (err) {
            console.error(err);
            alert('Une erreur est survenu');
        }
    };
    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                connexion
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Adresse email"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Mot de passe"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Se connecter
                </Button>
            </form>
            <Typography align="center" sx={{ mt: 2 }}>
                Pas de compte ? <Link to="/register">Inscrivez vous ici</Link>
            </Typography>
        </Container>
    );
};

export default LoginPage;