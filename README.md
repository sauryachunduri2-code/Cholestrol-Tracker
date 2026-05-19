# Cholesterol Tracker Website

A full-stack web application for tracking cholesterol levels, managing risk factors, and accessing health information.

## Features

✅ **User Authentication** - Secure login and registration
✅ **Cholesterol Tracking** - Log and monitor cholesterol readings
✅ **Risk Factor Assessment** - Track personal health risk factors
✅ **Educational Content** - Learn about cholesterol levels and health
✅ **Heart-Healthy Recipes** - Discover cholesterol-friendly recipes
✅ **User Data Persistence** - All data saved to database

## Tech Stack

**Backend:**
- Node.js + Express
- SQLite3 Database
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React 18
- Vite (build tool)
- Modern CSS3

## Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Set up environment variables**
Create a `.env` file in the root:
```
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

3. **Start Backend Server**
```bash
npm run dev
```
The backend runs on `http://localhost:5000`

4. **In another terminal, start Frontend**
```bash
cd client
npm install
npm run dev
```
The frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Cholesterol Readings
- `POST /api/readings` - Add cholesterol reading
- `GET /api/readings` - Get user's readings

### Risk Factors
- `POST /api/risk-factors` - Save risk factors
- `GET /api/risk-factors` - Get user's risk factors

### Information
- `GET /api/recipes` - Get recipes
- `GET /api/info/cholesterol-levels` - Get cholesterol guidelines
- `GET /api/info/risk-factors` - Get risk factor information

## Project Structure

```
cholesterol-tracker/
├── server/
│   ├── db/
│   │   └── schema.js          # Database setup
│   ├── middleware.js          # Auth middleware
│   ├── routes.js              # API routes
│   └── index.js               # Server entry point
├── client/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── package.json
```

## Future Enhancements

🚀 **Coming Soon:**
- Claude AI integration for personalized recommendations
- Advanced analytics and charts
- Export data to PDF
- Mobile app
- Email reminders
- Doctor integration

## License

MIT
