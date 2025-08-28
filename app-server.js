import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan'
import cors from 'cors';
import ensureLoggedIn from './config/ensureLoggedIn.js'
import jwt from './config/jwt.js'
import homeRoutes from './routes/home.js'
import userRoutes from './routes/users.js'
import categoryRoutes from './routes/categories.js'
import itemRoutes from './routes/items.js'
import bookingRoutes from './routes/bookings.js'
import profileRoutes from './routes/profile.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(morgan('dev'))

// // API Routes - these must come before the static file serving
app.use('/api/home', jwt, ensureLoggedIn,homeRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes); // public routes first
app.use('/api/categories', jwt, ensureLoggedIn, categoryRoutes); // protected routes
app.use('/api/items', jwt, ensureLoggedIn,itemRoutes)
app.use('/api/bookings', jwt, ensureLoggedIn,bookingRoutes)
app.use('/api/users', profileRoutes);


// app.use('/api/users', userRoutes);
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