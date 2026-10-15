<<<<<<< HEAD
  Dayananda Sagar Institutions - College Newsletter & Event Management System

A complete MERN stack application for managing college events and newsletters.

 Overview

This system allows:
- Students to submit events with image uploads
- HODs to approve/reject events before they go public
- Everyone to view approved events in the monthly newsletter via a public page

Features

✅ User authentication with JWT
✅ Role-based access control (Student, HOD, Admin)
✅ Event submission with image uploads (Multer)
✅ Event approval workflow
✅ Monthly newsletter view
✅ Secure password hashing (bcrypt)
✅ Clean, modern UI with Vite + React
✅ Responsive design
✅ RESTful API

🛠️ Tech Stack
Backend:
- Node.js & Express.js
- MongoDB
- JWT Authentication
- bcryptjs for password hashing
- Multer for file uploads
- CORS enabled

Frontend:
- React.js (with Vite)
- React Router v6
- Axios for API calls
- Context API for state management
- CSS for styling

Project Structure

dayanand news/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Event.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── eventController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── eventRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── role.js
│   │   ├── errorHandler.js
│   │   └── multer.js
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── HodDashboard.jsx
    │   │   └── Newsletter.jsx
    │   ├── components/
    │   │   ├── Navigation.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── globals.css
    │   │   ├── Navigation.css
    │   │   ├── Auth.css
    │   │   ├── LandingPage.css
    │   │   ├── Dashboard.css
    │   │   └── Newsletter.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── .env
    ├── .env.example
    ├── vite.config.js
    └── package.json
 Installation & Setup

 Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file (or copy from `.env.example`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dayananda_newsletter
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dayananda_newsletter
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file (or copy from `.env.example`):
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

User Roles & Features

1. Student
- Register with email and password
- Create events with image upload
- View their submitted events
- See event status (pending, approved, rejected)
- Delete pending events
- Edit pending events
- View approved events in the newsletter

2. Head of Department (HOD)
- Login with credentials
- View all pending events from their department
- Approve events
- Reject events with feedback
- Same newsletter access as students

3. Admin (Optional)
- Full access to all features
- Can approve/reject any event
- Can manage users and events

 API Endpoints

Authentication
```
POST   /api/auth/register       - Register a new user
POST   /api/auth/login          - Login user
```

Events (Protected Routes)
```
POST   /api/events              - Create event (Students)
GET    /api/events/my           - Get user's events
GET    /api/events/approved     - Get all approved events (Public)
GET    /api/events/pending      - Get pending events (HOD/Admin)
GET    /api/events/month/:month/:year - Get events by month/year (Public)
PUT    /api/events/:id          - Update event (Students)
PUT    /api/events/:id/approve  - Approve event (HOD/Admin)
PUT    /api/events/:id/reject   - Reject event (HOD/Admin)
DELETE /api/events/:id          - Delete event (Students/Admin)
```

 Example Usage

1. Register as Student
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "department": "Computer Science"
}
```

2. Register as HOD
```json
{
  "name": "Dr. Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "hod",
  "department": "Computer Science"
}
```

3. Create Event
```
POST /api/events
Headers: Authorization: Bearer <token>
Body: FormData with:
  - title: "Annual Tech Fest 2024"
  - description: "Join us for the biggest tech event"
  - eventDate: "2024-03-15"
  - eventTime: "10:00"
  - department: "Computer Science"
  - image: <file>
```

 UI Features

- Clean Modern Design - Professional gradient backgrounds
- Responsive Layout  - Works on desktop, tablet, mobile
- Form Validation  - Real-time feedback
-  Image Preview  - See images before upload
- Status Indicators  - Visual feedback for event status
- Navigation Bar  - Sticky navigation with user info
- Protected Routes  - Role-based access control

 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Role-based authorization middleware
- ✅ CORS protection
- ✅ Image file type validation
- ✅ Input validation
- ✅ Error handling middleware

 File Upload

Images are stored in the `backend/uploads/` directory and served via:
```
http://localhost:5000/uploads/event-<timestamp>.jpg
```

 Troubleshooting

MongoDB Connection Error:
- Ensure MongoDB is running locally or check Atlas credentials
- Verify `MONGODB_URI` in `.env`

CORS Issues:
- Check that backend is running on port 5000
- Verify `VITE_API_URL` in frontend `.env`

Port Already in Use:
- Change `PORT` in backend `.env`
- Change `port` in frontend `vite.config.js`

Image Upload Failed:
- Check `backend/uploads/` directory exists
- Verify file size < 5MB
- Ensure image format is jpg, jpeg, png, or gif

 Database Schema

 User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'student' | 'hod' | 'admin',
  department: String,
  createdAt: Date
}
```

 Event
```javascript
{
  title: String,
  description: String,
  image: String (file path),
  eventDate: Date,
  eventTime: String,
  month: Number,
  year: Number,
  department: String,
  createdBy: ObjectId (User),
  status: 'pending' | 'approved' | 'rejected',
  rejectionReason: String,
  approvedBy: ObjectId (User),
  createdAt: Date
}
```
 Deployment

 Backend (Heroku/Render)
1. Create `Procfile`: `web: node server.js`
2. Connect MongoDB Atlas
3. Set environment variables in hosting platform
4. Deploy

Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Set env variables
4. Done!

 Notes

- Change `JWT_SECRET` in production to a strong random string
- Use MongoDB Atlas for production (not local MongoDB)
- Implement rate limiting for production
- Add SSL certificates for HTTPS
- Use environment-specific configurations

 Development Tips

Run both servers concurrently:
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

View API responses:
Use Postman or similar tool for testing APIs before implementing frontend

MongoDB GUI:
Use MongoDB Compass for visual database management

 License

MIT License - Feel free to use this project!

 Contributing

Contributions are welcome! Please feel free to enhance the project.

---        

Created for Dayananda Sagar Institutions

 College-Newspaper
>>>>>>> 5d0c7efd34a3f0ec52f8a830f34cdcd564dd30cb
