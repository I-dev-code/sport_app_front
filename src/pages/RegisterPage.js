//src page pour register
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from "@mui/material";

const RegisterPage = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //appel au back pour register
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, email, motDePasse: password }),
            });
            if (response.ok) {
                alert('Inscription réussi vous povez maintenant vous connecter');
                navigate('/login');
            } else {
                const error = await response.text();
                alert('Erreur: ' + error);
            }
        } catch (err) {
            console.error(err);
            alert('Une erreur est survenu a la créeation du compte');
        }
    };
    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Inscription
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nom complet"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <TextField
                    label="adresse email"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="mot de passe"
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
                    Créer un compte
                </Button>
            </form>
            <Typography align="center" sx={{ mt: 2 }}>
                Déjà un compte ? <Link to="/Login">Connecter vous ici</Link>
            </Typography>
        </Container>
    );
};

export default RegisterPage;