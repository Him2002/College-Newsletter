# 📖 Complete Installation & Setup Guide

## ⚙️ Prerequisites

Before starting, ensure you have:

1. **Node.js** - Download from [nodejs.org](https://nodejs.org)
   - Recommended: v16.x or higher
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **MongoDB**
   - **Option A (Local):** Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - **Option B (Cloud):** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)

4. **Text Editor/IDE** - VS Code recommended

5. **Git** (optional) - For cloning/version control

---

## 🔧 Step 1: Setup MongoDB

### Option A: Local MongoDB Setup

**Windows:**
1. Download MongoDB from official website
2. Run the installer
3. Complete installation with default settings
4. MongoDB service starts automatically
5. Verify: Open Command Prompt and run:
   ```
   mongosh
   ```

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster (M0 - Free)
4. Create database user with credentials
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/name`

---

## 🚀 Step 2: Backend Setup

### 2.1 Navigate to Backend
```bash
cd "c:\Users\himan\OneDrive\Desktop\dayanand news\backend"
```

### 2.2 Install Dependencies
```bash
npm install
```

This installs:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- multer
- cors
- dotenv
- nodemon (dev dependency)

### 2.3 Create .env File

Create file: `backend/.env`

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dayananda_newsletter
JWT_SECRET=dayananda_sagar_2024_secret_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas:**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/dayananda_newsletter
JWT_SECRET=dayananda_sagar_2024_secret_key_change_this_in_production
NODE_ENV=development
```

### 2.4 Verify Backend Directory Structure

Ensure these files exist:
```
backend/
├── config/db.js
├── models/User.js
├── models/Event.js
├── controllers/authController.js
├── controllers/eventController.js
├── routes/authRoutes.js
├── routes/eventRoutes.js
├── middleware/auth.js
├── middleware/role.js
├── middleware/errorHandler.js
├── middleware/multer.js
├── uploads/ (empty directory)
├── server.js
├── package.json
└── .env
```

### 2.5 Start Backend Server

```bash
npm run dev
```

✅ **Expected Output:**
```
Server running on port 5000
MongoDB Connected: localhost
```

**Success Indicators:**
- No errors in console
- Server running message appears
- MongoDB connection confirmed

**Common Issues:**

| Issue | Solution |
|-------|----------|
| MongoDB connection refused | Start MongoDB service or check Atlas credentials |
| Port 5000 already in use | Change PORT in .env |
| Module not found errors | Run `npm install` again |

---

## 🎨 Step 3: Frontend Setup

### 3.1 Open New Terminal/Command Prompt

Keep the backend running! Open a new terminal window.

### 3.2 Navigate to Frontend
```bash
cd "c:\Users\himan\OneDrive\Desktop\dayanand news\frontend"
```

### 3.3 Install Dependencies
```bash
npm install
```

This installs:
- react
- react-dom
- react-router-dom
- axios
- vite (build tool)

### 3.4 Create .env File

Create file: `frontend/.env`

```
VITE_API_URL=http://localhost:5000/api
```

### 3.5 Verify Frontend Directory Structure

Ensure these files exist:
```
frontend/
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
│   ├── context/AuthContext.jsx
│   ├── services/api.js
│   ├── styles/ (all CSS files)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── .env
```

### 3.6 Start Frontend Server

```bash
npm run dev
```

✅ **Expected Output:**
```
  VITE v4.x.x  build xx

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

---

## ✅ Step 4: Verify Everything Works

### 4.1 Access the Application

Open browser and go to: `http://localhost:3000`

### 4.2 Test Landing Page
- ✅ See "Dayananda Sagar Institutions" heading
- ✅ See three buttons: Login, Register, View Newsletter
- ✅ Navigate to newsletter - should show empty (no approved events yet)

### 4.3 Create Test User (Student)

1. Click "Register"
2. Fill form:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Department: Computer Science
   - Role: Student
3. Click "Register"
4. ✅ Should redirect to Student Dashboard

### 4.4 Create Test User (HOD)

1. Logout (button in top right)
2. Click "Register"
3. Fill form:
   - Name: Dr. Jane Smith
   - Email: jane@example.com
   - Password: password123
   - Department: Computer Science
   - Role: Head of Department
4. Click "Register"
5. ✅ Should redirect to HOD Dashboard

### 4.5 Test Event Creation

**As Student:**
1. Login as John Doe
2. Click "Create New Event"
3. Fill form:
   - Title: "Tech Conference 2024"
   - Description: "Annual technology conference"
   - Date: Select a future date
   - Time: 10:00
   - Department: Computer Science
   - Upload an image file from your computer
4. Click "Submit Event"
5. ✅ Event appears with "PENDING" status

### 4.6 Test Event Approval

**As HOD:**
1. Logout and login as Dr. Jane Smith
2. Go to HOD Dashboard
3. See pending event from John
4. Click "✅ Approve"
5. ✅ Event status changes to "APPROVED"

### 4.7 View Newsletter

**As Anyone:**
1. Click "Newsletter" in top navigation
2. Check if month/year filters work
3. ✅ See approved events from previous steps

---

## 🎯 Testing Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can register as student
- [ ] Can register as HOD
- [ ] Can login with credentials
- [ ] Can create events with image upload
- [ ] Image preview works
- [ ] HOD can see pending events
- [ ] HOD can approve events
- [ ] HOD can reject with reason
- [ ] Students see event status
- [ ] Newsletter shows approved events
- [ ] Logout functionality works
- [ ] Protected routes work (can't access without login)

---

## 📱 Project Running Checklist

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Output: Server running on port 5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Output: Local: http://localhost:3000/
```

**Browser:**
```
http://localhost:3000
```

---

## 🆘 Troubleshooting Guide

### Backend Issues

#### Error: "Cannot find module 'express'"
**Solution:**
```bash
cd backend
npm install
npm install express mongoose bcryptjs jsonwebtoken multer cors dotenv
```

#### Error: "MongoDB connection refused"
**Solution:**
1. Check if MongoDB is running:
   ```bash
   # Windows
   Get-Service MongoDB
   
   # Mac
   brew services list
   ```
2. Start MongoDB if not running
3. Or use MongoDB Atlas and update URI in .env

#### Error: "Port 5000 already in use"
**Solution:**
1. Change PORT in `.env` to 5001 or 5002
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

#### Error: ".env file not found"
**Solution:**
```bash
cd backend
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### Frontend Issues

#### Error: "Cannot find module 'react'"
**Solution:**
```bash
cd frontend
npm install
```

#### Error: "VITE_API_URL is not defined"
**Solution:**
1. Create `.env` file in frontend directory
2. Add: `VITE_API_URL=http://localhost:5000/api`
3. Restart `npm run dev`

#### Error: "Cannot GET /dashboard"
**Solution:**
Routes are case-sensitive. Use exact paths:
- `/login`
- `/register`
- `/student-dashboard`
- `/hod-dashboard`
- `/newsletter`

#### Port 3000 already in use
**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### API/Authentication Issues

#### Error: "Token is not valid"
**Solution:**
1. Logout and login again
2. Check if JWT_SECRET in backend .env is unchanged
3. Clear browser localStorage: Open DevTools > Application > Storage > Clear

#### Error: "Access denied" when approving event
**Solution:**
- Ensure you're logged in as HOD (not student)
- Check that event belongs to same department

#### Images not loading
**Solution:**
1. Ensure images were uploaded (check `backend/uploads/` folder)
2. Verify backend is serving static files (should see `GET /uploads/...` in console)
3. Check API response includes correct image path

---

## 🔄 Running After First Setup

**Future sessions:**

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev

# Browser
http://localhost:3000
```

---

## 🎯 Next Steps

1. **Create more test data** - Add multiple events and users
2. **Customize styling** - Modify CSS files in `src/styles/`
3. **Add more features** - Email notifications, event updates, etc.
4. **Deploy to production** - Set up on Heroku/Vercel/Netlify
5. **Optimize images** - Compress event images before upload
6. **Add validation** - Enhance form validation

---

## 📞 Quick Reference

| What | Command | Port |
|------|---------|------|
| Backend | `npm run dev` | 5000 |
| Frontend | `npm run dev` | 3000 |
| MongoDB | (auto running) | 27017 |
| Access App | Open browser | 3000 |

---

## ✨ You're All Set!

Your MERN application is now running! 🚀

**Happy coding!** 💻
