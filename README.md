# EV - Event Management Platform

**EV** is a comprehensive event management platform designed to revolutionize how people organize and manage events. Whether you're planning a wedding, corporate event, birthday party, or any special occasion, EV provides everything you need in one place - from equipment rental to service bookings, all with a seamless user experience.

## 🎯 Project Vision

EV aims to be the **one-stop solution** for event planning, connecting event organizers with service providers and equipment suppliers. Our platform simplifies the complex process of event management by providing an intuitive marketplace where users can discover, compare, and book everything they need for their perfect event.

## Demo

 Visit the [live demo](https://ev-lrt7.onrender.com) to see EV in action

<br>


## 👥 Team

This project is developed by a team of 6 developers:

- **Ahmed** - Backend Developer (APIs & Routes)
- **Mohammed Ali** - Backend Developer (Database & Models)
- **Mohammed Adel** - Frontend Developer (User Features)
- **Ayah** - Frontend Developer (Marketplace & Browsing)
- **Hawra** - UI/UX Designer (Styling & Layout)
- **Zainab** - Project Manager (Booking System & Config)


## 🌟 Core Features

### 🔐 **User Authentication & Management**
- **Secure Registration**: Email-based signup with password encryption
- **JWT Authentication**: Secure login sessions with token-based authentication
- **User Profiles**: Personalized dashboard with account management
- **Password Security**: Encrypted password storage and recovery options

### 🛍️ **Event Marketplace**
- **Category-Based Browsing**: Organized categories (Audio, Lighting, Decorations, Furniture, etc.)
- **Advanced Search**: Find items by name, description, price range, and category
- **Item Details**: Comprehensive information including specifications, pricing, and availability
- **Visual Gallery**: Rich media presentation of products and services

### 🛒 **Smart Shopping Cart**
- **Real-Time Cart Management**: Add, remove, and modify quantities instantly
- **Price Calculation**: Automatic total calculation with tax and fees
- **Session Persistence**: Cart maintained across browser sessions
- **Quantity Controls**: Easy increment/decrement with availability checking

### 📋 **Booking & Checkout System**
- **Streamlined Checkout**: Simple, secure booking process
- **Order Summary**: Detailed breakdown of items, quantities, and pricing
- **Booking Confirmation**: Instant confirmation with unique order IDs
- **Payment Integration**: Secure payment processing (future enhancement)

### 📊 **Order Management & History**
- **Booking History**: Complete record of all past and current bookings
- **Order Details**: Detailed view of each booking with item breakdown
- **Order Status**: Real-time updates on booking status and delivery
- **Reorder Functionality**: Quick reorder from previous bookings

## 🎭 Complete User Journey

### **1. Registration & Login Process**
```
🔹 User visits EV homepage
🔹 Clicks "Sign Up" to create new account
🔹 Fills registration form (Name, Email, Password, Phone)
🔹 Email verification (optional)
🔹 Account created successfully
🔹 Redirected to login page
🔹 Enters credentials (Email & Password)
🔹 JWT token generated and stored
🔹 User logged in and redirected to Home/Dashboard
```

### **2. Event Planning Journey**
```
🏠 Home Page
    ↓
🛍️ Browse Marketplace (Createbooking Page)
    ↓
📋 Select Categories (Audio, Lighting, Decorations, etc.)
    ↓
🔍 Search & Filter Items
    ↓
📝 View Item Details & Specifications
    ↓
🛒 Add Items to Cart (with quantities)
    ↓
💰 Review Cart & Total Price
    ↓
✅ Proceed to Checkout
    ↓
📋 Fill Booking Details (Event Date, Location, Special Instructions)
    ↓
💳 Payment Processing (Future Feature)
    ↓
🎉 Order Confirmed with Booking ID
    ↓
📧 Confirmation Email Sent
    ↓
📊 View in Order History
```

### **3. Ongoing Management**
```
👤 Profile Management
    ├── Update Personal Information
    ├── Change Password
    ├── Manage Preferences
    └── Account Settings

📋 Order History
    ├── View All Past Bookings
    ├── Track Current Order Status
    ├── Download Invoices/Receipts
    ├── Reorder Previous Items
    └── Rate & Review Services

🔄 Repeat Bookings
    ├── Quick Reorder from History
    ├── Modify Previous Orders
    └── Save Favorite Items/Packages
```

## 🛠️ Tech Stack

### Frontend
- **React.js 18+** - Modern UI framework with hooks
- **React Router Dom** - Client-side routing and navigation
- **CSS3 & Flexbox/Grid** - Modern responsive styling
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communications
- **Context API** - State management for user auth and cart

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling and validation
- **JWT (jsonwebtoken)** - Secure authentication tokens
- **bcryptjs** - Password hashing and security
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Nodemon** - Automatic server restart during development
- **Git** - Version control system

## 📁 Complete Project Structure

```EV/                                    # Root project directory
├── .env                              # Environment variables (DB URI, JWT secret, API keys, etc.)
├── .gitignore                        # Git ignore rules  
├── package.json                      # Root package.json with scripts & dependencies
├── package-lock.json                 # Dependency lock file
├── README.md                         # Project documentation
├── eslint.config.js                  # ESLint configuration for code linting
├── index.html                        # Main HTML entry file for Vite/React
├── vite.config.js                    # Vite build configuration
├── app-server.js                     # Main Express server configuration (can serve both API & client)
├── server.js                         # Alternative server entry point
│
├── public/                           # Static assets served directly
│   └── vite.svg                     # Vite logo
│
├── config/                           # Backend configuration files
│   ├── database.js                   # MongoDB connection setup
│   └── jwt.js                        # JWT configuration & utilities
│
├── controllers/                      # Business logic controllers
│   ├── bookingController.js          # Booking CRUD operations
│   ├── categoryController.js         # Category management logic
│   ├── itemController.js             # Item/service management
│   └── userController.js             # User management & authentication
│
├── middleware/                       # Express middleware
│   └── auth.js                       # Authentication & token validation middleware
│
├── models/                           # Database schemas (Mongoose models)
│   ├── Booking.js                    # Booking schema & validation
│   ├── Category.js                   # Category schema
│   ├── Item.js                       # Item/service schema
│   └── User.js                       # User schema & password hashing methods
│
├── routes/                           # API route handlers
│   ├── bookings.js                   # Booking API endpoints
│   ├── categories.js                 # Category API endpoints
│   ├── items.js                      # Item API endpoints
│   └── users.js                      # User API endpoints
│
├── src/                              # React frontend source code
│   ├── App.jsx                       # Root React component
│   ├── main.jsx                      # React entry point (mounts App to DOM)
│   ├── index.scss                    # Global SCSS styles
│   │
│   ├── assets/                       # Static assets (images, icons, etc.)
│   │   └── react.svg                 # React logo
│   │
│   ├── components/                   # Reusable React components
│   │   │
│   │   ├── auth/                     # Authentication components
│   │   │   ├── Login/                
│   │   │   │   ├── Login.jsx         # Login form
│   │   │   │   └── Login.module.scss # Login styles (SCSS modules)
│   │   │   └── Signup/
│   │   │       ├── Signup.jsx        # Signup form
│   │   │       └── Signup.module.scss# Signup styles
│   │   │
│   │   ├── bookingHistory/           # Booking history & cart components
│   │   │   ├── BookingCart/          
│   │   │   │   ├── BookingCart.jsx   # Cart for bookings
│   │   │   │   └── BookingCart.scss  # Styles
│   │   │   ├── BookingDetail/
│   │   │   │   ├── BookingDetail.jsx # Single booking details
│   │   │   │   └── BookingDetail.scss
│   │   │   ├── BookingHistory/
│   │   │   │   ├── BookingHistory.jsx# List of all past bookings
│   │   │   │   └── BookingHistory.scss
│   │   │   ├── CartItem/
│   │   │   │   ├── CartItem.jsx      # Single item in cart
│   │   │   │   └── CartItem.scss
│   │   │   ├── Checkout/
│   │   │   │   ├── Checkout.jsx      # Checkout process component
│   │   │   │   └── Checkout.scss
│   │   │   └── CreateHistory/
│   │   │       ├── CreateHistory.jsx # Add new booking history
│   │   │       └── CreateHistory.scss
│   │   │
│   │   ├── common/                   # Shared components
│   │   │   ├── Footer/               
│   │   │   │   ├── Footer.jsx        # Footer
│   │   │   │   └── Footer.module.scss
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx        # Header
│   │   │   │   └── Header.module.scss
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   │   └── Navbar.module.scss
│   │   │   └── Searchbar/
│   │   │       ├── Searchbar.jsx     # Search bar component
│   │   │       └── Searchbar.module.scss
│   │   │
│   │   └── createBooking/            # Components for booking flow
│   │       ├── CategoryCard/         
│   │       │   ├── CategoryCard.jsx  # Displays single category
│   │       │   └── CategoryCard.module.scss
│   │       ├── CategoryList/
│   │       │   ├── CategoryList.jsx  # Lists categories
│   │       │   └── CategoryList.module.scss
│   │       ├── ItemCard/
│   │       │   ├── ItemCard.jsx      # Displays single item
│   │       │   └── ItemCard.module.scss
│   │       ├── ItemDetail/
│   │       │   ├── ItemDetail.jsx    # Item detailed view
│   │       │   └── ItemDetail.module.scss
│   │       └── ItemList/
│   │           ├── ItemList.jsx      # List of all items
│   │           └── ItemList.module.scss
│   │
│   ├── pages/                        # Full page views
│   │   ├── AuthPage/                 
│   │   │   ├── AuthPage.jsx          # Authentication page (login/signup wrapper)
│   │   │   └── AuthPage.module.scss
│   │   ├── BookingHistory/
│   │   │   ├── BookingHistory.jsx    # Booking history page
│   │   │   └── BookingHistory.module.scss
│   │   ├── CreateBooking/
│   │   │   ├── CreateBooking.jsx     # Booking creation page
│   │   │   └── CreateBooking.module.scss
│   │   ├── Home/
│   │   │   ├── Home.jsx              # Homepage/dashboard
│   │   │   └── Home.module.scss
│   │   ├── NotFound/
│   │   │   ├── NotFound.jsx          # 404 page
│   │   │   └── NotFound.module.scss
│   │   └── Profile/
│   │       ├── Profile.jsx           # User profile page
│   │       └── Profile.module.scss
│   │
│   ├── styles/                       # Project-wide styles & assets
│   │   ├── 6522516.png               # Image
│   │   ├── EV-Black-Version.png      # Logo
│   │   └── profile-removebg-preview.png # Profile placeholder
│   │
│   └── utils/                        # Frontend utility functions
│       ├── bookings-api.js           # Booking API calls
│       ├── categories-api.js         # Category API calls
│       ├── items-api.js              # Item API calls
│       ├── users-api.js              # User API calls
│       ├── users-service.js          # User service (auth helpers)
│       ├── send-request.js           # Wrapper for fetch/axios
│       └── seed.js                   # Data seeding utility
└──
```

## 🎨 Event Categories & Services

### 🎵 **Audio & Sound Equipment**
- Professional microphones (wireless, handheld, clip-on)
- Sound systems and PA equipment
- DJ equipment and mixing consoles
- Speakers and amplifiers
- Audio recording devices

### 💡 **Lighting Solutions**
- LED stage lighting and spotlights
- Ambient and mood lighting
- String lights and fairy lights
- Uplighting and accent lighting
- Professional lighting controllers

### 🎨 **Decorations & Themes**
- Wedding backdrops and arches
- Balloon arrangements and arches
- Fresh and artificial flower arrangements
- Table centerpieces and linens
- Themed decoration packages

### 🪑 **Furniture & Seating**
- Round and rectangular tables
- Chiavari and folding chairs
- Lounge furniture and sofas
- Bar stools and cocktail tables
- Dance floors and staging

### 🍽️ **Catering Equipment**
- Food warming stations and chafing dishes
- Coffee and beverage stations
- Serving platters and utensils
- Portable bars and ice stations
- Refrigeration units

### 📸 **Photography & Entertainment**
- Photo booths with props and backdrops
- Professional cameras and lighting
- Entertainment systems
- Projection screens and AV equipment
- Live streaming equipment

## 📊 Complete API Endpoints

### 👤 **Authentication & User Management**
```bash
POST   /api/users/register          # User registration
POST   /api/users/login             # User login
GET    /api/users/profile           # Get current user profile
PUT    /api/users/profile           # Update user profile
POST   /api/users/change-password   # Change user password
POST   /api/users/forgot-password   # Forgot password request
POST   /api/users/reset-password    # Reset password with token
GET    /api/users/verify-email      # Email verification
DELETE /api/users/account           # Delete user account
```

### 🏷️ **Categories Management**
```bash
GET    /api/categories              # Get all categories
GET    /api/categories/:id          # Get category by ID
GET    /api/categories/:id/items    # Get items in specific category
GET    /api/categories/search/:query # Search categories
POST   /api/categories              # Create new category (Admin)
PUT    /api/categories/:id          # Update category (Admin)
DELETE /api/categories/:id          # Delete category (Admin)
```

### 📦 **Items & Services Management**
```bash
GET    /api/items                   # Get all items (with filtering)
GET    /api/items/:id               # Get item by ID
GET    /api/items/category/:categoryId # Get items by category
GET    /api/items/search/:query     # Search items
GET    /api/items/featured          # Get featured items
GET    /api/items/price-range       # Get items by price range
POST   /api/items                   # Create new item (Admin)
PUT    /api/items/:id               # Update item (Admin)
PUT    /api/items/:id/availability  # Update item availability (Admin)
DELETE /api/items/:id               # Delete item (Admin)
```

### 📋 **Bookings & Orders Management**
```bash
GET    /api/bookings               # Get user's bookings
GET    /api/bookings/:id           # Get specific booking details
POST   /api/bookings               # Create new booking
PUT    /api/bookings/:id           # Update booking status
DELETE /api/bookings/:id           # Cancel booking
GET    /api/bookings/history       # Get booking history
POST   /api/bookings/reorder/:id   # Reorder from previous booking
```

### 🛒 **Shopping Cart Management** (Future Feature)
```bash
GET    /api/cart                   # Get user's cart
POST   /api/cart/add               # Add item to cart
PUT    /api/cart/update/:itemId    # Update cart item quantity
DELETE /api/cart/remove/:itemId    # Remove item from cart
DELETE /api/cart/clear             # Clear entire cart
```

### **Git Branch Strategy**
```bash
main                     # Production branch
├── development         # Integration branch
│   ├── feature/backend-apis          # Ahmed's work
│   ├── feature/database-models       # Mohammed Ali's work
│   ├── feature/user-interface        # Mohammed Adel's work
│   ├── feature/marketplace           # Ayah's work
│   ├── feature/ui-styling            # Hawra's work
│   └── feature/booking-config        # Zainab's work
```

### **Development Best Practices**
- **Component Architecture**: Reusable, single-responsibility components
- **State Management**: Context API for global state, local state for components
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Code Style**: ESLint + Prettier for consistent code formatting
- **Git Conventions**: Conventional commit messages and meaningful branch names
- **Testing**: Unit tests for utilities, integration tests for API endpoints
- **Documentation**: Comprehensive JSDoc comments for all functions

## 🎨 Features in Detail

### 🛍️ **Marketplace (Createbooking Page)**
- **Interactive Category Sidebar**: 6 main categories with icons and descriptions
- **Smart Search**: Real-time search with autocomplete suggestions
- **Advanced Filtering**: Filter by price range, availability, and popularity
- **Responsive Item Grid**: Adaptive layout that works on all devices
- **Quick Add to Cart**: One-click adding with quantity adjustment
- **Visual Feedback**: Loading states, hover effects, and animations
- **Price Display**: Clear pricing with per-day rates

### 🛒 **Smart Shopping Cart System**
- **Real-Time Updates**: Instant quantity changes and total calculations
- **Persistent Storage**: Cart maintained across browser sessions
- **Item Management**: Easy add, remove, and quantity modifications
- **Price Breakdown**: Subtotal, taxes, fees, and final total
- **Availability Check**: Real-time availability validation
- **Quick Checkout**: Streamlined path to booking completion

### 👤 **Comprehensive User Management**
- **Secure Registration**: Email verification and strong password requirements
- **JWT Authentication**: Secure, stateless authentication system
- **Profile Customization**: Personal information, preferences, and settings
- **Account Security**: Password change, two-factor authentication (future)
- **Privacy Controls**: Data management and account deletion options

### 📊 **Advanced Order History**
- **Complete Booking Records**: All past, current, and upcoming bookings
- **Detailed Order Views**: Item breakdown, pricing, dates, and status
- **Order Tracking**: Real-time status updates and delivery information
- **Easy Reordering**: One-click reorder from previous bookings
- **Invoice Management**: Download receipts and invoices
- **Review System**: Rate and review items and services (future)

### 🔍 **Powerful Search Engine**
- **Multi-Field Search**: Search across item names, descriptions, and categories
- **Smart Suggestions**: Autocomplete and search term suggestions
- **Filter Combinations**: Multiple simultaneous filters
- **Sort Options**: Price, popularity, newest, alphabetical
- **Search History**: Recently searched terms for quick access
- **Advanced Queries**: Boolean search operators (future enhancement)

## 🔐 Security & Performance

### **Security Measures**
- **Password Hashing**: bcryptjs with salt rounds for secure storage
- **JWT Tokens**: Short-lived access tokens with refresh token system
- **Input Validation**: Server-side validation for all user inputs
- **SQL Injection Prevention**: Mongoose ODM prevents injection attacks
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Rate Limiting**: API rate limiting to prevent abuse
- **HTTPS Enforcement**: SSL/TLS encryption in production
- **Data Sanitization**: Input sanitization to prevent XSS attacks

### **Performance Optimizations**
- **Database Indexing**: Optimized MongoDB indexes for fast queries
- **Caching Strategy**: Redis caching for frequently accessed data (future)
- **Image Optimization**: Compressed images with modern formats
- **Code Splitting**: Lazy loading of React components
- **Bundle Analysis**: Webpack bundle analyzer for optimization
- **CDN Integration**: Content delivery network for static assets
- **Gzip Compression**: Server-side compression for faster loading

## 🚀 Deployment Guide

### **Production Environment Setup**

1. **Environment Variables for Production**
   ```env
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ev-production
   JWT_SECRET=your_256_bit_production_secret_key
   JWT_EXPIRE=30d
   CORS_ORIGIN=https://yourdomain.com
   REDIS_URL=redis://localhost:6379
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

2. **Build for Production**
   ```bash
   # Install dependencies
   npm install --production

   # Build React application
   npm run build

   # Start production server
   npm start
   ```

3. **Docker Deployment**
   ```dockerfile
   # Dockerfile example
   FROM node:16-alpine
   
   WORKDIR /app
   
   # Copy package files
   COPY package*.json ./
   COPY server/package*.json ./server/
   
   # Install dependencies
   RUN npm install --production
   RUN cd server && npm install --production
   
   # Copy source code
   COPY . .
   
   # Build React app
   RUN npm run build
   
   # Expose port
   EXPOSE 3000
   
   # Start application
   CMD ["npm", "start"]
   ```

## 👥 Development Team

This project is collaboratively developed by a talented team of 6 developers, each specializing in different aspects of the platform:

| Developer | Role | Responsibilities | Branch |
|-----------|------|-----------------|---------|
| **Ahmed** | Backend Developer | API endpoints, route handlers, authentication middleware | `feature/backend-apis` |
| **Mohammed Ali** | Database Engineer | MongoDB schemas, database configuration,

## 📌 Project Management

We use Trello to track tasks, milestones, and progress throughout the project.
🔗 [Trello Board](https://trello.com/invite/b/68aafa8ebe8a23c12a382b4e/ATTI6ae3a4a68620c6fffe1fdaaa70071948ED9B827D/ev)

## 🎨 Design & Prototyping

Design mockups, branding, and visual assets are created using Canva.
🔗 [Canva Designs](https://www.canva.com/design/DAGw9lRB3jo/cmtHq-7po3jKELn3FowTWg/edit?utm_content=DAGw9lRB3jo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## 👥 Presentaion

Presentaion Powerpoint.
🔗 [Presentation](https://docs.google.com/presentation/d/1zz-PdF1fpTBGL_DzhJco6yfujJxr56B4/edit?usp=sharing&ouid=104688052935961599990&rtpof=true&sd=true)

## 🎯 Conclusion

**EV** aims to redefine celebration event planning by combining modern technology, AI personalization, and user-friendly tools.
With strong collaboration, creativity, and innovation, this platform is built to make every event unforgettable.

### ✨ Plan smarter. Celebrate better. With EV.