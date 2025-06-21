// server.js
// ─────────────────────────────────────────────────────────────────────────────
// Load environment variables AT THE VERY TOP
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import eformsignRoutes from './routes/eformsign.js';

// __dirname replacement in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config({ path: path.resolve(__dirname, './.env') });
if (result.error) {
  console.error(
    '[FATAL] Error loading .env file from server/server.js:',
    result.error
  );
} else {
  console.log('[dotenv] .env file loaded successfully from server/server.js.');
  console.log('[dotenv] PORT from env in server.js:', process.env.PORT);
  console.log(
    '[dotenv] EFORMSIGN_API_KEY from env in server.js:',
    process.env.EFORMSIGN_API_KEY ? 'Loaded' : 'NOT LOADED OR EMPTY'
  );
  console.log(
    '[dotenv] EFORMSIGN_PRIVATE_KEY from env in server/server.js:',
    process.env.EFORMSIGN_PRIVATE_KEY ? 'Loaded' : 'NOT LOADED OR EMPTY'
  );
}

const app = express();
const PORT = process.env.PORT ?? 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', eformsignRoutes);

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV ?? 'development'}`);
});

export default app;
