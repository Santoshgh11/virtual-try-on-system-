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



import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
});

export default API;

// ✅ Your existing scanBody function (No changes)
export const scanBody = async (scanData) => {
  try {
    const response = await API.post("/body-scan", scanData);
    return response.data; // Return the processed response
  } catch (error) {
    console.error("Error scanning body:", error);
    throw error; // Throw error to handle it in the component
  }
};

// ✅ New function: Fetch outfit suggestions from AI
export const getOutfitSuggestions = async (preferences) => {
  try {
    const response = await API.post("/outfit-suggestions", { preferences });
    return response.data; // Return AI outfit recommendations
  } catch (error) {
    console.error("Error fetching outfit suggestions:", error);
    throw error; // Handle error properly in components
  }
};
