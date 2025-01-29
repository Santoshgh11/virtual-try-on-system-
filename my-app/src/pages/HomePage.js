// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <div className="container mx-auto text-center">
//       <h1 className="text-4xl font-bold my-5">Welcome to Virtual Try-On</h1>
//       <p>Select a feature to proceed:</p>
//       <div className="flex justify-center gap-4 mt-5">
//         <Link to="/scan" className="btn-primary">Start Scanning</Link>
//         <Link to="/suggestions" className="btn-primary">Outfit Suggestions</Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-300 text-white">
//       <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Virtual Try-On</h1>
//       <p className="text-xl mb-8 font-light">Experience AI-powered outfit suggestions and virtual try-on!</p>
//       <div className="flex space-x-6">
//         <Link to="/scan" className="bg-white text-blue-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition">
//           Start Scanning
//         </Link>
//         <Link to="/suggestions" className="bg-white text-blue-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition">
//           Outfit Suggestions
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;





// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-300 text-white">
//       <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Virtual Try-On</h1>
//       <p className="text-xl mb-8 font-light">Experience AI-powered virtual outfit trials!</p>
//       <Link to="/scan" className="bg-white text-blue-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition">
//         Start Scanning
//       </Link>
//     </div>
//   );
// };

// export default HomePage;





import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-300 text-white">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <motion.div 
        className="relative text-center max-w-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Virtual Try-On System</h1>
        <p className="text-xl mb-6 font-light">
          Experience AI-powered virtual outfit trials! Scan your body, explore recommendations, and visualize outfits in 3D.
        </p>

        {/* Image Section */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <img src="/assets/scan_demo.png" alt="Scan" className="w-32 h-32 rounded-lg shadow-lg transform hover:scale-110 transition" />
          <img src="/assets/3d_model_demo.png" alt="3D Model" className="w-32 h-32 rounded-lg shadow-lg transform hover:scale-110 transition" />
          <img src="/assets/ai_suggestions_demo.png" alt="AI Suggestions" className="w-32 h-32 rounded-lg shadow-lg transform hover:scale-110 transition" />
        </div>

        {/* Buttons */}
        <div className="flex space-x-6 justify-center">
          <Link to="/scan">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              className="bg-white text-blue-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition"
            >
              Start Scanning
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
