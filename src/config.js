// import axios from "axios";

// const instance = axios.create({
//   baseURL: process.env.BASE_URL,
// });

// instance.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.status === 403) {
//       console.dir(error);
//       error.response.statusText =
//         "Your request timed out, kindly login and try again";
//       if (localStorage) {
//         localStorage.clear();
//         window.location.replace("/login");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// const createHeaders = (token) => ({
//   "x-access-token": `Bearer ${token}`,
// });

// export const postAPI = (path, data, token) => {
//   return instance.post(path, data, { headers: createHeaders(token) });
// };

// export const getAPI = (path, token) => {
//   return instance.get(path, { headers: createHeaders(token) });
// };

// export const getPDF = async (url, config) => {
//   return instance.get(url, config);
// };

// export const putAPI = (path, data, token) => {
//   return instance.put(path, data, { headers: createHeaders(token) });
// };

// export const deleteAPI = (path, data, token) => {
//   return instance.delete(path, { data, headers: createHeaders(token) });
// };

// export const verifyAPI = async (path, token) => {
//   try {
//     const response = await instance.get(path, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error occurred during API request:", error.message);
//     throw error;
//   }
// };

// export default instance;

// config.js
const baseURL = process.env.REACT_APP_BASE_URL;  // Use REACT_APP prefix for environment variables in Create React App
export default baseURL;