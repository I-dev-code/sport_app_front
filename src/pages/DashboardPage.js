//Dashboard page
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, TextField, MenuItem } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [genre, setGenre] = useState('');
    const [age, setAge] = useState('');
    const [taille, setTaille] = useState('');
    const [poids, setPoids] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                //check if data = complete
                if (data.genre && data.age && data.taille && data.poids) {
                    setIsProfileComplete(true);
                } else {
                    setIsProfileComplete(false);
                }
            } else {
                //quelles sont les erreurs ? redirection vers login ?
                navigate('/login'); 
            }
        };
        fetchUser();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //appel au back update profile
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/users/updateprofile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    genre,
                    age: parseInt(age),
                    taille: parseFloat(taille),
                    poids: parseFloat(poids),
                }),
            });
            if (response.ok) {
                alert('Profile mis a jour avec succès.');
                setIsProfileComplete(true);
                //Mettre a jour les info
                const updateUser = { ...user, genre, age, taille, poids };
                setUser(updateUser);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || errorData.errors?.[0]?.msg || 'Erreur loras de la mise a jour';
                alert('Erreur : ' + errorMessage);
            }
        } catch (err) {
            console.error(err);
            alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    };

    const handleLogout = () => {
        //supprimer le token jwt
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };


    if (!user) {
        return <Typography>Chargement...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Tableau de bord
            </Typography>
            <Typography align="center">
                Bienvenue sur le Tableau de bord de l'application
            </Typography>
            {isProfileComplete ? (
                <Typography>Bienvenue, {user.nom} !</Typography>
            ) : (
                <div>
                    <Typography variant="h6" gutterBottom>
                        Veuillez compléter votre profil :
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                        select
                        label="Genre"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}>
                            <MenuItem value="Homme">Homme</MenuItem>
                            <MenuItem value="Femme">Femme</MenuItem>
                        </TextField>
                        <TextField
                        select
                        label="Age"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}/>
                        <TextField
                        select
                        label="Taille (cm)"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        value={taille}
                        onChange={(e) => setTaille(e.target.value)}/>
                        <TextField
                        select
                        label="Poids (kg)"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        value={poids}
                        onChange={(e) => setPoids(e.target.value)}/>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}> Enregistrez les informations</Button>                   
                    </form>
                </div>
            )}
            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
                Se déconnecter
            </Button>
        </Container>
    );
};

export default DashboardPage;