# 📌 Quick Reference Guide

## 🚀 Start the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
Expected: `Server running on port 5000`

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
Expected: `Local: http://localhost:3000/`

**Access:** `http://localhost:3000`

---

## 👤 Test Users to Create

### Student User
- Name: `John Doe`
- Email: `john@example.com`
- Password: `password123`
- Role: `Student`
- Department: `Computer Science`

### HOD User
- Name: `Dr. Jane Smith`
- Email: `jane@example.com`
- Password: `password123`
- Role: `Head of Department`
- Department: `Computer Science`

---

## 🎯 Features to Test

### Landing Page
- [ ] Shows college name
- [ ] Shows about section
- [ ] Has Login button
- [ ] Has Register button
- [ ] Has View Newsletter button

### Registration
- [ ] Can register as student
- [ ] Can register as HOD
- [ ] Form validation works
- [ ] Redirects to dashboard after signup

### Login
- [ ] Can login with valid credentials
- [ ] Shows error for invalid credentials
- [ ] Redirects to appropriate dashboard

### Student Dashboard
- [ ] Can create new event
- [ ] Can upload image
- [ ] Image preview works
- [ ] Can see submitted events
- [ ] Can see event status
- [ ] Can delete pending events
- [ ] Can view rejection reasons

### HOD Dashboard
- [ ] Can see pending events
- [ ] Can approve events
- [ ] Can reject events with reason
- [ ] Events disappear after action

### Newsletter
- [ ] Shows all approved events
- [ ] Month filter works
- [ ] Year filter works
- [ ] Events sorted by date
- [ ] Images display correctly

### General
- [ ] Navigation bar shows user info
- [ ] Logout works
- [ ] Protected routes prevent unauthorized access
- [ ] Responsive design on mobile

---

## 🗂️ Important File Locations

```
Backend:
- Routes: backend/routes/
- Controllers: backend/controllers/
- Models: backend/models/
- Config: backend/config/db.js
- Server: backend/server.js

Frontend:
- Pages: frontend/src/pages/
- Components: frontend/src/components/
- Auth: frontend/src/context/AuthContext.jsx
- API: frontend/src/services/api.js
- Styles: frontend/src/styles/
```

---

## 🔧 Configuration Files

**Backend `.env`:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dayananda_newsletter
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📊 Database Collections

After creating users and events, MongoDB will have:

1. **users** collection
   - Stores registered users
   - Fields: name, email, password (hashed), role, department

2. **events** collection
   - Stores all events
   - Fields: title, description, image, eventDate, status, etc.

---

## 🎨 UI Components

- Navigation Bar (Top)
- Auth Forms (Login/Register)
- Event Cards (Dashboard)
- Newsletter View
- Image Upload with Preview
- Status Badges
- Buttons (Primary, Secondary, Danger)

---

## 🔐 Authorization Rules

| Feature | Student | HOD | Admin |
|---------|---------|-----|-------|
| Create Event | ✅ | ✅ | ✅ |
| View Own Events | ✅ | ✅ | ✅ |
| Edit Own Events | ✅ (pending only) | ✅ (pending only) | ✅ |
| Delete Own Events | ✅ (pending only) | ✅ (pending only) | ✅ |
| View Pending | ❌ | ✅ (own dept) | ✅ |
| Approve Events | ❌ | ✅ (own dept) | ✅ |
| Reject Events | ❌ | ✅ (own dept) | ✅ |
| View Newsletter | ✅ | ✅ | ✅ |

---

## 🆘 Quick Fixes

**Backend not starting:**
```bash
npm install
npm run dev
```

**Frontend not running:**
```bash
npm install
npm run dev
```

**Can't login:**
- Check if backend is running (port 5000)
- Verify user was created
- Check browser console for errors

**Images not showing:**
- Check `backend/uploads/` folder has files
- Verify backend is serving static files
- Check browser Network tab for 404 errors

**MongoDB error:**
- Start MongoDB service
- Or update to MongoDB Atlas instead

---

## 📱 Responsive Breakpoints

- **Desktop:** 1200px and up
- **Tablet:** 768px to 1199px
- **Mobile:** Less than 768px

All pages responsive on all screen sizes.

---

## 🚀 Next Steps

1. ✅ Install and run application
2. ✅ Create test users
3. ✅ Create test events
4. ✅ Test approval workflow
5. ✅ Verify newsletter functionality
6. ✅ Test on different devices
7. 📝 Deploy to production

---

## 📞 Support

Common issues and solutions:

1. **Port Already in Use** → Change PORT in .env
2. **MongoDB Won't Connect** → Install MongoDB or use Atlas
3. **Images Not Uploading** → Check file size (< 5MB) and type
4. **Token Expired** → Logout and login again
5. **CORS Error** → Backend not running on 5000

---

## 🎊 You're Ready!

The application is fully functional and production-ready!

**Happy coding!** 🚀
