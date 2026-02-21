# Backend - Dayananda Sagar Institutions Newsletter System

Express.js + MongoDB backend for the college event management system.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT auth
- **multer** - File uploads
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **nodemon** - Dev auto-reload

## 📂 Structure

```
config/      - Database configuration
models/      - MongoDB schemas (User, Event)
controllers/ - Business logic
routes/      - API endpoints
middleware/  - Auth, role-checking, error handling
uploads/     - Uploaded images directory
server.js    - Express app setup
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Events
- `POST /api/events` - Create event
- `GET /api/events/my` - Get user's events
- `GET /api/events/approved` - Get approved events
- `GET /api/events/pending` - Get pending events (HOD only)
- `GET /api/events/month/:month/:year` - Get events by date
- `PUT /api/events/:id` - Update event
- `PUT /api/events/:id/approve` - Approve event (HOD only)
- `PUT /api/events/:id/reject` - Reject event (HOD only)
- `DELETE /api/events/:id` - Delete event

## 🔐 Authentication

Uses JWT tokens stored in localStorage on frontend.

**Request format:**
```
Authorization: Bearer <token>
```

## 📸 Image Uploads

- Handled by Multer middleware
- Stored in `uploads/` directory
- Max size: 5MB
- Allowed types: jpg, jpeg, png, gif
- Served at: `http://localhost:5000/uploads/<filename>`

## 🧪 Test Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student",
    "department": "Computer Science"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## ⚙️ Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dayananda_newsletter
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based authorization middleware
- CORS protection
- Input validation
- Error handling middleware

## 📊 Database Models

### User
- name (String)
- email (String, unique)
- password (String, hashed)
- role (student/hod/admin)
- department (String)
- createdAt (Date)

### Event
- title (String)
- description (String)
- image (String, file path)
- eventDate (Date)
- eventTime (String)
- month (Number)
- year (Number)
- department (String)
- createdBy (Reference to User)
- status (pending/approved/rejected)
- rejectionReason (String)
- approvedBy (Reference to User)
- createdAt (Date)

## 🚀 Production Tips

- Change JWT_SECRET to strong random value
- Use MongoDB Atlas instead of local DB
- Set NODE_ENV to production
- Add rate limiting
- Enable HTTPS
- Add request logging
- Implement file cleanup for old uploads

---

Made for Dayananda Sagar Institutions ✨
