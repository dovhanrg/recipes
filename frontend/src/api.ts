import axios from 'axios';

const domain = process.env.BASE_DOMAIN || 'localhost';
console.log(process.env);

const baseURL = `http://${domain}:5000`;

export const axiosInstance = axios.create({
  baseURL
})

const API = {
  RECIPES: 'recipes'
}

export default API;
