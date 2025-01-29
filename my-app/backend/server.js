// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(express.json()); // Parses incoming JSON requests
// app.use(cors()); // Allows frontend to communicate with backend

// // Sample API Route
// app.get("/", (req, res) => {
//     res.send("Backend is running...");
// });

// // API for Image Processing (Modify as needed)
// app.post("/api/body-scan", (req, res) => {
//     const { image } = req.body;
    
//     if (!image) {
//         return res.status(400).json({ error: "No image provided" });
//     }

//     // Process the image (Placeholder logic)
//     console.log("Received Image Data:", image.substring(0, 50)); // Trimming output for logs

//     // Simulate Success Response
//     res.status(200).json({ message: "Scan successful", scanResult: "Body scan completed" });
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log('Server running on http://localhost:${PORT}');
// });


const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running...");
});

// API Route
app.post("/api/body-scan", (req, res) => {
    console.log("📸 Received Image Data:", req.body);
    res.status(200).json({ message: "Scan successful" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { spawn } = require("child_process");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/body_measurements", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const MeasurementSchema = new mongoose.Schema({
//   arm_length: Number,
//   shoulder_width: Number,
//   torso_length: Number,
//   torso_width: Number,
//   timestamp: { type: Date, default: Date.now },
// });

// const Measurement = mongoose.model("Measurement", MeasurementSchema);

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });

// // API to trigger AI measurement models
// app.post("/api/scan", async (req, res) => {
//   console.log("Starting AI measurement models...");

//   const pythonProcess = spawn("python", ["ai_models/body_scan/server.py"]);

//   pythonProcess.stdout.on("data", async (data) => {
//     console.log(`AI Output: ${data}`);

//     try {
//       const measurements = JSON.parse(data);

//       // Store in MongoDB
//       const savedMeasurement = await Measurement.create(measurements);
//       console.log("Measurements saved:", savedMeasurement);

//       res.json({ success: true, message: "Measurements stored successfully", data: savedMeasurement });
//     } catch (error) {
//       console.error("Error parsing AI response:", error);
//       res.status(500).json({ success: false, message: "AI processing failed" });
//     }
//   });

//   pythonProcess.stderr.on("data", (data) => {
//     console.error(`AI Model Error: ${data}`);
//     res.status(500).json({ success: false, message: "AI model execution error" });
//   });
// });

// // API to fetch latest measurements
// app.get("/api/latest-measurements", async (req, res) => {
//   try {
//     const latestMeasurement = await Measurement.findOne().sort({ timestamp: -1 });

//     if (!latestMeasurement) {
//       return res.status(404).json({ success: false, message: "No measurements found." });
//     }

//     res.json(latestMeasurement);
//   } catch (error) {
//     console.error("Error fetching latest measurements:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch measurements." });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
