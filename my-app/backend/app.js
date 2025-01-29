// const express = require('express');
// const bodyParser = require('body-parser');
// const bodyScannerRoutes = require('./routes/bodyScannerRoutes');

// const app = express();
// app.use(bodyParser.json());

// app.use('/api/body-scan', bodyScannerRoutes);

// app.listen(5000, () => console.log('Backend running on port 5000'));

// const express = require('express');
// const bodyParser = require('body-parser');
// const bodyScannerRoutes = require('./routes/bodyScannerRoutes'); // Import the routes

// const app = express();

// // Middleware
// app.use(bodyParser.json()); // Parse incoming JSON data

// // Define the route
// app.use('/api/body-scan', bodyScannerRoutes); // All body scan requests will go to bodyScannerRoutes

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));



    // const express = require('express');
    // const cors = require('cors');

    // const app = express();
    // app.use(cors());  // Fix CORS issues
    // app.use(express.json());

    // const scanRoutes = require('./routes/scan');
    // app.use('/api', scanRoutes); // Attach scan routes

    // const PORT = process.env.PORT || 5000;
    // app.listen(PORT, () => console.log('Server running on port ${PORT}'));






    const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Pool } = require('pg');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse incoming JSON data

// MongoDB Connection (For User Data & Preferences)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// PostgreSQL Connection (For Inventory & Product Data)
const pgPool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

pgPool
  .connect()
  .then(() => console.log('✅ PostgreSQL connected successfully'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err));

// Routes
const scanRoutes = require('./routes/scan');
const bodyScannerRoutes = require('./routes/outfitRoutes.'); // Existing body scan routes

app.use('/api/scan', scanRoutes); // Attach scan routes
app.use('/api/body-scan', bodyScannerRoutes); // Attach body scanner routes

// Handle Invalid Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const outfitRoutes = require('./routes/outfitRoutes');
app.use('/api/outfits', outfitRoutes);
