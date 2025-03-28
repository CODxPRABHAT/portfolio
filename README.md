# Portfolio Website

A modern, responsive portfolio website built with React.js for the frontend and Node.js/Express.js for the backend. Features include user authentication, portfolio management, and a contact system.

## Features

- 🎨 Modern and responsive design with dark theme
- 🔐 User authentication (login/register)
- 📝 Dynamic portfolio management through dashboard
- 📚 Academic details management
- 💼 Projects showcase
- 📧 Contact form
- 🔒 Protected routes for admin access
- 🌐 API health monitoring

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS for security

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/hemantsingh443/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
```

4. Start the development servers:
```bash
# Start backend server (from backend directory)
npm start

# Start frontend development server (from frontend directory)
npm start
```

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

2. Configure the Web Service:
   - Name: `portfolio-backend` (or your preferred name)
   - Environment: `Node`
   - Region: Choose the closest to your target audience
   - Branch: `main`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free (or your preferred tier)

3. Add Environment Variables:
   - Click on "Environment" tab
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_secure_jwt_secret
     NODE_ENV=production
     PORT=10000
     ```

4. Auto-Deploy Configuration:
   - Enable auto-deploy for automatic deployments when you push to main
   - Configure branch deployment settings if needed

5. CORS Configuration:
   - Update `backend/app.js` with your frontend domain in the CORS configuration
   - Example:
     ```javascript
     const corsOptions = {
       origin: process.env.NODE_ENV === 'production' 
         ? ['https://your-frontend-domain.com']
         : 'http://localhost:3000',
       credentials: true,
       optionsSuccessStatus: 200
     };
     ```

### Frontend Deployment

1. Update API Configuration:
   - In `src/services/api.js`, update the API base URL:
     ```javascript
     const API_URL = process.env.NODE_ENV === 'production'
       ? 'https://your-backend-domain.onrender.com/api'
       : 'http://localhost:5000/api';
     ```

2. Deploy to your preferred platform (Vercel, Netlify, etc.)

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/user` - Get current user data (protected)

### Portfolio Management
- GET `/api/portfolio` - Get portfolio data
- PUT `/api/portfolio/bio` - Update bio
- POST `/api/portfolio/project` - Add new project
- PUT `/api/portfolio/project/:id` - Update project
- DELETE `/api/portfolio/project/:id` - Delete project
- POST `/api/portfolio/academic` - Add academic detail
- PUT `/api/portfolio/academic/:id` - Update academic detail
- DELETE `/api/portfolio/academic/:id` - Delete academic detail

### Contact
- POST `/api/contact` - Submit contact form

### Health Check
- GET `/api/health` - API health status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
