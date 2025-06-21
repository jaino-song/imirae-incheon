// Load environment variables AT THE VERY TOP
const path_dotenv = require('path'); // Renamed to avoid conflict if 'path' is used later
const dotenvResult = require('dotenv').config({ path: path_dotenv.resolve(__dirname, './.env') });

if (dotenvResult.error) {
  console.error('[FATAL] Error loading .env file from server/server.js:', dotenvResult.error);
} else {
  console.log('[dotenv] .env file loaded successfully from server/server.js.');
  console.log('[dotenv] PORT from env in server.js:', process.env.PORT);
  console.log('[dotenv] EFORMSIGN_API_KEY from env in server.js:', process.env.EFORMSIGN_API_KEY ? 'Loaded' : 'NOT LOADED OR EMPTY');
  console.log('[dotenv] EFORMSIGN_PRIVATE_KEY from env in server.js:', process.env.EFORMSIGN_PRIVATE_KEY ? 'Loaded' : 'NOT LOADED OR EMPTY');
}

const express = require('express');
const cors = require('cors');
const path = require('path'); // Original 'path' for other uses

const app = express();
const PORT = process.env.PORT || 5000; // PORT should be read after dotenv.config()

// CORS configuration
const whitelist = ['https://imirae-incheon-client.vercel.app', 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
const eformsignRoutes = require('./routes/eformsign');
app.use('/api', eformsignRoutes);

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; 
