// import axios from 'axios'

// export const axiosInstance=axios.create({
//     baseURL:`${import.meta.env.VITE_API_URL}/api`,
//     withCredentials:true
// })
import axios from 'axios';

export const axiosInstance = axios.create({
  // Corrected the baseURL to use VITE_API_URL from the environment variables
  // baseURL: `http://localhost:3001/api`, // Corrected base URL by including '/api' endpoint
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  // Ensuring credentials are sent with the request (if needed)
  withCredentials: true,
});
console.log(`${import.meta.env.VITE_API_URL}/api`);
console.log("Axios Base URL:", axiosInstance.defaults.baseURL);

