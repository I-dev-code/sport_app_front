import api from './apiService';

export const loginUser = async (email: string, password: string) => {
  return await api.post('/users/login', { email, motDePasse: password });
};

export const registerUser = async (userData: any) => {
  return await api.post('/users/register', userData);
};