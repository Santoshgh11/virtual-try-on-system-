// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Replace with your backend URL
// });

// export default API;


// services/api.js (already defined)







// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Replace with your backend URL
// });

// export default API;

// // Updated body scan function in api.js or a separate service file like bodyScanner.js
// export const scanBody = async (scanData) => {
//   try {
//     const response = await API.post('/body-scan', scanData);
//     return response.data; // Return the processed response
//   } catch (error) {
//     console.error('Error scanning body:', error);
//     throw error; // Throw error to handle it in the component
//   }
// };



import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Node.js Backend API
});

const AI_SERVER = axios.create({
  baseURL: 'http://localhost:5001/api', // Flask AI Model API
});

export default API;

// Body Scan API - Send data to Flask AI Model
export const scanBody = async (scanData) => {
  try {
    const response = await AI_SERVER.post('/body-scan', scanData);
    return response.data;
  } catch (error) {
    console.error('Error scanning body:', error);
    throw error;
  }
};
