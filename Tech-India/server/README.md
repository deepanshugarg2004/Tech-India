# TechLearn Backend API

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techlearn
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

3. Make sure MongoDB is running (or use MongoDB Atlas for cloud)

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Students
- `POST /api/students/register` - Register new student
- `POST /api/students/login` - Student login
- `GET /api/students/profile` - Get student profile (auth required)
- `PUT /api/students/profile` - Update student profile (auth required)
- `GET /api/students/browse` - Browse all students (auth required)

### Recruiters
- `POST /api/recruiters/register` - Register new recruiter
- `POST /api/recruiters/login` - Recruiter login
- `GET /api/recruiters/profile` - Get recruiter profile (auth required)
- `PUT /api/recruiters/profile` - Update recruiter profile (auth required)
- `GET /api/recruiters/browse` - Browse all recruiters (auth required)

### Connections
- `POST /api/connections/request` - Create connection request
- `PUT /api/connections/:connectionId` - Accept/Reject connection
- `GET /api/connections/my-connections` - Get user's connections

## Authentication

Include JWT token in headers:
```
Authorization: Bearer <token>
```
or
```
x-auth-token: <token>
```
