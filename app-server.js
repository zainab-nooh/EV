import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import auth from './server/middleware/auth.js'
import jwt from './server/config/jwt.js'
import userRoutes from './server/routes/users.js'
import categoryRoutes from './server/routes/categories.js'
import itemRoutes from './server/routes/items.js'
import bookingRoutes from './server/routes/bookings.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})

// // API Routes - these must come before the static file serving
app.use('/users.js', userRoutes)
app.use('/categories.js', categoryRoutes )
app.use('/items.js', itemRoutes)
app.use('/bookings.js', bookingRoutes)
// app.use('/api/users', userRoutes);
// app.use('/api/items', checkToken, ensureLoggedIn, itemRoutes);
// app.use('/api/orders', checkToken, ensureLoggedIn, orderRoutes);

// Determine which directory to serve static files from
const staticDir = process.env.NODE_ENV === 'production' ? 'dist' : 'public';
const indexPath = process.env.NODE_ENV === 'production' ? 'dist/index.html' : 'index.html';

// Serve static files from the appropriate directory
app.use(express.static(staticDir));

// For React Router - serve index.html for all non-API routes
app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    // Serve the React app for all other routes
    res.sendFile(path.resolve(path.join(__dirname, indexPath)));
});

export default app;