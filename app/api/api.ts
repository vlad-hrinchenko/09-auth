import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://09-auth-two.vercel.app/',
  withCredentials: true,
});
