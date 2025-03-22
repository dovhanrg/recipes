import axios from "axios";

const baseApiDomain = process.env.BASE_API_DOMAIN || 'themealdb.com';
const baseApiUrl = `https://www.${baseApiDomain}/api/json/v1/1`;


const axiosInstance = axios.create({
    baseURL: baseApiUrl,
});

axiosInstance.interceptors.request.use((config) => {
    console.log(config.url);
    return config;
})

export default axiosInstance;
