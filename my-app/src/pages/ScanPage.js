// import React from 'react';
// import CameraScanner from '../components/CameraScanner/CameraScanner';

// const ScanPage = () => {
//   return (
//     <div>
//       <h1 className="text-center text-3xl font-bold">Body Scanning</h1>
//       <CameraScanner />
//     </div>
//   );
// };

// export default ScanPage;


// import React from 'react';
// import CameraScanner from '../components/CameraScanner/CameraScanner';

// const ScanPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
//       <h1 className="text-5xl font-bold mb-6">Body Scanning</h1>
//       <CameraScanner />
//       <p className="mt-4 text-lg">Ensure proper lighting for accurate scanning.</p>
//     </div>
//   );
// };

// export default ScanPage;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CameraScanner from '../components/CameraScanner/CameraScanner';

// const ScanPage = () => {
//   const [scanningComplete, setScanningComplete] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate body scanning process for 10 seconds
//     const timer = setTimeout(() => {
//       setScanningComplete(true); // Show success message after scanning completes
//     }, 10000);

//     // After 5 seconds, redirect to the Result Page
//     if (scanningComplete) {
//       const redirectTimer = setTimeout(() => {
//         navigate('/result');
//       }, 2000); // Wait for 2 seconds before redirecting to Result Page

//       return () => clearTimeout(redirectTimer); // Clean up the redirect timer
//     }

//     return () => clearTimeout(timer); // Clean up the initial timer
//   }, [scanningComplete, navigate]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
//       <h1 className="text-5xl font-bold mb-6">Body Scanning</h1>
//       <div className="w-full max-w-4xl border-4 border-blue-500 rounded-lg overflow-hidden shadow-lg">
//         <CameraScanner />
//       </div>
//       {!scanningComplete ? (
//         <p className="mt-4 text-lg">Scanning in progress... Please wait.</p>
//       ) : (
//         <p className="mt-4 text-xl font-bold text-green-600">
//           Face Registration and Body Scanning were done successfully!
//         </p>
//       )}
//     </div>
//   );
// };

// export default ScanPage;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CameraScanner from '../components/CameraScanner/CameraScanner';
// import { scanBody } from '../services/api'; // Import the scanBody API function

// const ScanPage = () => {
//   const [scanningComplete, setScanningComplete] = useState(false);
//   const [scanData, setScanData] = useState(null); // State to hold scan data
//   const [errorMessage, setErrorMessage] = useState(null); // State to handle errors
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate body scanning process for 10 seconds
//     const timer = setTimeout(() => {
//       // After 10 seconds, set scanningComplete to true
//       setScanningComplete(true);

//       // Example scan data (replace with real data from CameraScanner if needed)
//       const exampleScanData = {
//         height: 170, // Height in cm
//         weight: 65,  // Weight in kg
//         dimensions: { chest: 90, waist: 70, hips: 95 },
//       };

//       // Call the backend API with scan data
//       handleScanSubmission(exampleScanData);
//     }, 10000);

//     return () => clearTimeout(timer); // Clean up the timer
//   }, []);

//   // Function to handle scan data submission
//   const handleScanSubmission = async (data) => {
//     try {
//       const result = await scanBody(data); // Call the scanBody API
//       setScanData(result); // Save the result in state
//     } catch (error) {
//       console.error('Error during scanning:', error);
//       setErrorMessage('Failed to process the scan. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (scanningComplete && scanData) {
//       // Redirect to Result Page after showing success message
//       const redirectTimer = setTimeout(() => {
//         navigate('/result', { state: { scanData } }); // Pass scan data to Result Page
//       }, 2000); // Wait for 2 seconds before redirecting

//       return () => clearTimeout(redirectTimer); // Clean up the redirect timer
//     }
//   }, [scanningComplete, scanData, navigate]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
//       <h1 className="text-5xl font-bold mb-6">Body Scanning</h1>
//       <div className="w-full max-w-4xl border-4 border-blue-500 rounded-lg overflow-hidden shadow-lg">
//         <CameraScanner />
//       </div>
//       {!scanningComplete ? (
//         <p className="mt-4 text-lg">Scanning in progress... Please wait.</p>
//       ) : (
//         <p className="mt-4 text-xl font-bold text-green-600">
//           Face Registration and Body Scanning were done successfully!
//         </p>
//       )}
//       {errorMessage && (
//         <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
//       )}
//     </div>
//   );
// };

// export default ScanPage;








import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScanPage = ({ setScanningComplete }) => {
    const [scanning, setScanning] = useState(false); // ✅ Track scanning status
    const navigate = useNavigate();

    // ✅ Start the scanning process by calling Flask API
    const startScanning = async () => {
        setScanning(true);
        try {
            const response = await fetch("http://localhost:5000/start-scanning");
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error("Error starting scan:", error);
        }
    };

    // ✅ Stop scanning and fetch measurements
    const stopScanning = async () => {
        try {
            const response = await fetch("http://localhost:5000/stop-scanning");
            const data = await response.json();
            console.log(data.message);
            
            // ✅ Once scanning is stopped, update state & navigate to 3D model
            setScanningComplete(true);
            navigate('/3d-model'); // ✅ Redirect to 3D Model page
        } catch (error) {
            console.error("Error stopping scan:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
            <h1 className="text-5xl font-bold mb-6">Body Scanning</h1>
            <p className="mt-4 text-lg">Click start to begin scanning</p>

            <div className="mt-6 flex gap-4">
                <button 
                    onClick={startScanning} 
                    disabled={scanning} // ✅ Disable while scanning
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                >
                    {scanning ? "Scanning..." : "Start Scanning"}
                </button>
                <button 
                    onClick={stopScanning} 
                    disabled={!scanning} // ✅ Disable if not scanning
                    className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
                >
                    Stop Scanning
                </button>
            </div>
        </div>
    );
};

export default ScanPage;

