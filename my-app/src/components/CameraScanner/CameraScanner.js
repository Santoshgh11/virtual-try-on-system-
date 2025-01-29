// import React, { useRef } from 'react';

// const CameraScanner = () => {
//   const videoRef = useRef(null);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error('Error accessing camera:', error);
//     }
//   };

//   return (
//     <div className="camera-scanner">
//       <video ref={videoRef} autoPlay className="border rounded-lg"></video>
//       <button onClick={startCamera} className="btn-primary mt-4">Start Scanning</button>
//     </div>
//   );
// };

// export default CameraScanner;

// import React, { useRef, useEffect } from 'react';

// const CameraScanner = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     async function startCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error('Error accessing camera:', error);
//       }
//     }
//     startCamera();
//   }, []);

//   return (
//     <div className="w-full max-w-3xl border-4 border-blue-500 rounded-lg overflow-hidden shadow-lg">
//       <video ref={videoRef} autoPlay className="w-full rounded-lg"></video>
//       <button 
//         className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
//       >
//         Start Scanning
//       </button>
//     </div>
//   );
// };

// export default CameraScanner;

// import React, { useRef, useEffect } from 'react';

// const CameraScanner = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     async function startCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error('Error accessing camera:', error);
//       }
//     }
//     startCamera();
//   }, []);

//   return (
//     <div className="w-full max-w-4xl border-4 border-blue-500 rounded-lg overflow-hidden shadow-lg">
//       <video ref={videoRef} autoPlay className="w-full rounded-lg"></video>
//     </div>
//   );
// };

// export default CameraScanner;



// import React, { useRef, useEffect, useState } from "react";

// const CameraScanner = ({ onScanComplete }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [scanComplete, setScanComplete] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Camera Error:", err);
//         setError("Unable to access camera.");
//       }
//     };

//     startCamera();
//   }, []);

//   const captureFrame = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;

//     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     const imageData = canvas.toDataURL("image/jpeg"); // Convert to base64
//     setScanComplete(true); // Mark scan as complete
//     onScanComplete(imageData);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <video ref={videoRef} autoPlay playsInline className="border-4 border-blue-500 rounded-lg shadow-lg"></video>
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//       <button 
//         onClick={captureFrame} 
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Capture & Scan
//       </button>
//       {error && <p className="text-red-500">{error}</p>}
//       {scanComplete && <p className="text-green-500">Scan Complete! Click Proceed.</p>}
//     </div>
//   );
// };

// export default CameraScanner;


import React, { useRef, useEffect, useState } from "react";
import * as mpPose from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";

const CameraScanner = ({ onScanComplete }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [error, setError] = useState(null);
  let camera = null;

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera Error:", err);
        setError("Unable to access camera.");
      }
    };

    startCamera();

    const pose = new mpPose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    pose.onResults((results) => {
      if (!results.poseLandmarks) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "red";
      results.poseLandmarks.forEach((landmark) => {
        ctx.beginPath();
        ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 5, 0, 2 * Math.PI);
        ctx.fill();
      });

      setScanComplete(true);
    });

    if (videoRef.current) {
      camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const captureFrame = () => {
    if (!scanComplete) {
      alert("No body detected! Please adjust your position.");
      return;
    }

    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/jpeg"); // Convert to base64
    onScanComplete(imageData);
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay playsInline className="border-4 border-blue-500 rounded-lg shadow-lg"></video>
      <canvas ref={canvasRef} className="absolute top-0 left-0"></canvas>
      <button onClick={captureFrame} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Capture & Scan
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {scanComplete && <p className="text-green-500">Body Detected! Click Scan.</p>}
    </div>
  );
};

export default CameraScanner;
