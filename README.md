# TechLearn Hub - Complete Platform

A comprehensive learning and recruitment platform connecting students, mentors, and recruiters.

## 🚀 Features

### For Students
- ✅ Student registration and login
- ✅ Profile management with skills, education, and experience
- ✅ Browse recruiters in flashcard format
- ✅ Connect with recruiters
- ✅ View and manage connections

### For Recruiters
- ✅ Recruiter registration and login
- ✅ Company profile management
- ✅ Browse students in flashcard format (Tinder-style)
- ✅ Connect with students
- ✅ View and manage connections

### For Mentors
- ✅ Mentor registration (multi-step form)
- ✅ Profile creation with skills and availability
- ✅ Chatroom functionality

## 📁 Project Structure

```
frontend/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── Components/
│   │   │   ├── StudentProfile.jsx
│   │   │   ├── RecruiterProfile.jsx
│   │   │   ├── StudentBrowse.jsx
│   │   │   ├── RecruiterBrowse.jsx
│   │   │   ├── RecruiterLogin.jsx
│   │   │   ├── RecruiterSignup.jsx
│   │   │   ├── StudentLogin.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Mentorsignup.jsx
│   │   │   ├── Chatroom.jsx
│   │   │   └── ...
│   │   └── App.jsx
│   └── package.json
├── server/                 # Express Backend
│   ├── models/
│   │   ├── Student.js
│   │   ├── Recruiter.js
│   │   └── Connection.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── recruiterRoutes.js
│   │   ├── connectionRoutes.js
│   │   └── mentorRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
└── DEPLOYMENT.md
```

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techlearn
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## 📱 Routes

### Public Routes
- `/` - Landing Page
- `/role` - Role Selection (Student/Mentor/Recruiter)
- `/login` - Mentor Login
- `/student-login` - Student Login
- `/recruiter-login` - Recruiter Login
- `/Signup` - Student Signup
- `/MentorSignup` - Mentor Signup
- `/recruiter-signup` - Recruiter Signup

### Protected Routes (Require Authentication)
- `/student-profile` - Student Profile Dashboard
- `/recruiter-profile` - Recruiter Profile Dashboard
- `/student-browse` - Browse Recruiters (Flashcard View)
- `/recruiter-browse` - Browse Students (Flashcard View)
- `/chatroom` - Chatroom
- `/mentor-dashboard` - Mentor Dashboard

## 🎨 Key Features

### Flashcard Matching System
- **RecruiterBrowse**: Recruiters can swipe through student profiles
- **StudentBrowse**: Students can swipe through recruiter/company profiles
- Swipe right to connect, left to pass
- Drag and drop support
- Progress tracking

### Profile Management
- Edit profiles with real-time updates
- Skills management (add/remove)
- Profile picture upload
- Education and experience tracking

### Connection System
- Send connection requests
- Accept/reject connections
- View all connections
- Connection status tracking

## 🔐 Authentication

- JWT-based authentication
- Token stored in localStorage
- Protected routes with authentication middleware
- Role-based access control

## 📦 API Endpoints

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

## 🎯 Responsive Design

All components are fully responsive and work seamlessly on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1280px+)

## 🚀 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions for both frontend and backend.

## 📝 Notes

- Backend uses MongoDB for data storage
- Frontend uses HashRouter for Vercel compatibility
- All components use Framer Motion for smooth animations
- Dark theme with gradient backgrounds
- Memory leak prevention for blob URLs
- Full error handling and validation

## 🔧 Technologies Used

### Frontend
- React 19
- React Router DOM
- Framer Motion
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt for password hashing
- CORS enabled

## 📄 License

MIT License
