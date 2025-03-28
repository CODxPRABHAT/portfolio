# Portfolio Backend

This is the backend server for the portfolio website. It provides API endpoints for authentication, portfolio management, and contact form submissions.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/user` - Get user data (protected)

### Portfolio
- PUT `/api/portfolio/bio` - Update bio (protected)
- POST `/api/portfolio/academic` - Add academic detail (protected)
- PUT `/api/portfolio/academic/:id` - Update academic detail (protected)
- DELETE `/api/portfolio/academic/:id` - Delete academic detail (protected)
- POST `/api/portfolio/project` - Add project (protected)
- PUT `/api/portfolio/project/:id` - Update project (protected)
- DELETE `/api/portfolio/project/:id` - Delete project (protected)

### Contact
- POST `/api/contact` - Submit contact form
- GET `/api/contact` - Get all contact submissions (protected)

## Deployment

1. Create an account on [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the following:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables in Render dashboard
6. Deploy! 