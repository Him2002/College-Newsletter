# 🆘 Troubleshooting & FAQ

Common issues and solutions.

---

## 🔴 BACKEND ISSUES

### ❌ "Cannot find module 'express'"

**Cause:** Dependencies not installed

**Solution:**
```bash
cd backend
npm install
```

### ❌ "MongoDB connection refused"

**Cause:** MongoDB not running

**Solution (Local):**
```bash
# Windows - Start MongoDB service
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

**Solution (Atlas):**
1. Check internet connection
2. Verify connection string in .env
3. Add IP to MongoDB Atlas whitelist
4. Test connection: `mongosh "mongodb+srv://..."`

### ❌ "Port 5000 already in use"

**Cause:** Another service using port 5000

**Solution:**
```bash
# Kill process using port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

Or change port in `.env`:
```
PORT=5001
```

### ❌ "JWT_SECRET environment variable not found"

**Cause:** .env file missing or not loaded

**Solution:**
```bash
cd backend
# Create .env from example
cp .env.example .env

# Edit .env and add:
JWT_SECRET=your_secret_key_here
```

### ❌ "TypeError: Cannot read property 'name' of undefined"

**Cause:** Request body not being parsed correctly

**Solution:** Ensure form data is sent correctly:
```bash
# For file uploads, use multipart/form-data
curl -F "title=Event" \
     -F "description=Desc" \
     -F "image=@/path/to/file.jpg" \
     ...
```

### ❌ "Email already exists"

**Cause:** User with that email already registered

**Solution:**
- Use different email
- Or check database for duplicate:
```bash
mongosh
use dayananda_newsletter
db.users.find({ email: "yourmail@example.com" })
```

### ❌ Server crashes after file upload

**Cause:** Image file too large or wrong format

**Solution:**
- Keep files < 5MB
- Use: jpg, jpeg, png, gif only
- Check `backend/uploads/` directory exists

---

## 🔴 FRONTEND ISSUES

### ❌ "Cannot find module 'react'"

**Cause:** Dependencies not installed

**Solution:**
```bash
cd frontend
npm install
```

### ❌ "VITE_API_URL is not defined"

**Cause:** .env file missing

**Solution:**
```bash
cd frontend
cp .env.example .env

# Edit .env
VITE_API_URL=http://localhost:5000/api
```

### ❌ Port 3000 already in use

**Cause:** Another service using port 3000

**Solution:**
```bash
# Kill process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac
lsof -i :3000
kill -9 <PID>
```

Or change in `vite.config.js`:
```javascript
server: {
  port: 3001,
}
```

### ❌ "Cannot GET /dashboard"

**Cause:** Typo in route name. Routes are case-sensitive.

**Solution:** Use exact route names:
- `/login` ✅
- `/register` ✅
- `/student-dashboard` ✅
- `/hod-dashboard` ✅
- `/newsletter` ✅

### ❌ "API request returns 401 Unauthorized"

**Cause:** Token expired or invalid

**Solution:**
1. Logout completely
2. Clear localStorage:
   ```javascript
   localStorage.clear()
   ```
3. Login again
4. Check browser console for errors

### ❌ Image preview not showing

**Cause:** File not selected or wrong type

**Solution:**
- Select an image file
- Use: jpg, jpeg, png, gif
- Or check console for FileReader errors

### ❌ "Failed to fetch" errors in console

**Cause:** Backend not running or wrong URL

**Solution:**
1. Check backend is running: `npm run dev`
2. Check port: Should be 5000
3. Verify `VITE_API_URL` in .env
4. Clear browser cache

### ❌ Login button not responding

**Cause:** Form validation failed

**Solution:**
1. Check email format (must have @)
2. Check password (must be 6+ characters)
3. Check if user exists
4. Check console for error messages

---

## 🔴 DATABASE ISSUES

### ❌ "MongoNetworkError: connect ECONNREFUSED"

**Cause:** MongoDB not running

**Solution:** Start MongoDB service (see above)

### ❌ "MongoServerError: E11000 duplicate key error"

**Cause:** Duplicate email in database

**Solution:**
```bash
mongosh
use dayananda_newsletter
db.users.deleteOne({ email: "duplicate@example.com" })
# or use different email for registration
```

### ❌ "Database 'dayananda_newsletter' not found"

**Cause:** Typo in database name or wrong connection string

**Solution:**
```bash
# Verify connection string in .env
MONGODB_URI=mongodb://localhost:27017/dayananda_newsletter

# Or check existing databases
mongosh
show databases
```

### ❌ "Authentication failed"

**Cause:** Wrong MongoDB Atlas credentials

**Solution:**
1. Go to MongoDB Atlas
2. Database Access → Reset password
3. Update connection string with new password
4. Update .env

---

## 🔴 IMAGE UPLOAD ISSUES

### ❌ Image upload fails

**Cause:** Multiple possibilities

**Solution:**
- Check file size (must be < 5MB)
- Check file type (jpg, jpeg, png, gif only)
- Verify `backend/uploads/` directory exists
- Check backend console for errors
- Ensure form has enctype="multipart/form-data"

### ❌ Images not loading in dashboard

**Cause:** Wrong image path or backend not serving files

**Solution:**
1. Check `backend/uploads/` folder has images
2. Check image path starts with `http://`
3. Check backend logs for errors
4. Test directly: `http://localhost:5000/uploads/event-xxx.jpg`

### ❌ "File too large" error

**Cause:** Image > 5MB

**Solution:**
- Compress image before upload
- Use: TinyPNG, ImageOptimizer, etc.
- Or increase limit in `backend/middleware/multer.js`:
```javascript
limits: { fileSize: 10 * 1024 * 1024 } // 10MB
```

---

## 🔴 AUTHENTICATION ISSUES

### ❌ Can't logout

**Cause:** Logout button not working properly

**Solution:**
```javascript
// Clear manually in browser console
localStorage.clear()
// or
localStorage.removeItem('token')
localStorage.removeItem('user')
```

### ❌ Token keeps expiring

**Cause:** JWT expires after 7 days (by default)

**Solution:**
1. Login again (get new token)
2. Or increase token expiry in `backend/controllers/authController.js`:
```javascript
expiresIn: '30d', // 30 days instead of 7
```

### ❌ Can't access protected routes

**Cause:** Not logged in or token invalid

**Solution:**
1. Login first
2. Ensure token saved in localStorage
3. Check developer tools → Application → Storage
4. Verify token exists

### ❌ Wrong role permissions

**Cause:** Trying to access HOD-only features as student

**Solution:**
- Students can only: Create, view, edit events
- HODs can also: Approve, reject events
- Register with correct role

---

## 🔴 FORM/VALIDATION ISSUES

### ❌ Registration fails with validation error

**Cause:** Missing or invalid field

**Solution:**
- Email must be valid (contain @)
- Password must be 6+ characters
- All fields must be filled
- Department must be selected
- Role must be selected

### ❌ Event creation fails

**Cause:** Missing required fields

**Solution:**
- Title: Required
- Description: Required
- Date: Must be future date
- Time: Must be valid time (HH:MM)
- Department: Must be selected
- Image: Must be uploaded

### ❌ "Please provide a rejection reason"

**Cause:** HOD trying to reject without reason

**Solution:**
- Fill in rejection reason field
- Reason will be sent to student

---

## 🟡 COMMON MISTAKES

### ❌ Running frontend and backend in same terminal

**Cause:** One won't start if other is running

**Solution:** Use separate terminals/tabs:
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2 (new window)
cd frontend
npm run dev
```

### ❌ Editing .env after starting app

**Cause:** Changes not loaded

**Solution:**
1. Stop the app (Ctrl+C)
2. Make changes
3. Restart: `npm run dev`

### ❌ Forgetting JWT_SECRET

**Cause:** App won't start

**Solution:**
```bash
# Generate and add to .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### ❌ Wrong database path

**Cause:** Can't connect to database

**Solution:**
- Local: `mongodb://localhost:27017/dayananda_newsletter`
- Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/name`

### ❌ Not restarting server after changes

**Cause:** Changes not reflected

**Solution:**
- Use `npm run dev` (with nodemon, auto-restarts)
- Or manually stop (Ctrl+C) and restart

---

## ❓ FAQ

### Q: Can I use a different port?
**A:** Yes, change in .env (backend) or vite.config.js (frontend)

### Q: Can I use PostgreSQL instead of MongoDB?
**A:** Yes, but need to rewrite models using Sequelize or TypeORM

### Q: How do I add more fields to events?
**A:** Edit Event.js model, create migration, update form

### Q: Can multiple HODs manage same department?
**A:** Yes, they have equal permissions

### Q: What happens if event is rejected?
**A:** Student gets feedback, can edit and resubmit

### Q: Can students delete approved events?
**A:** No, only pending events can be deleted

### Q: How long are tokens valid?
**A:** 7 days by default, changeable in authController.js

### Q: Can I change event date after approval?
**A:** No, only pending events can be edited

### Q: Where are uploaded images stored?
**A:** `backend/uploads/` folder (local) or S3/Cloud (production)

### Q: Can I make newsletter private?
**A:** Yes, add auth check to `/newsletter` route

### Q: How do I backup my database?
**A:** Use `mongodump` (local) or Atlas automatic backups

### Q: Can I add email notifications?
**A:** Yes, install `nodemailer` and add email service

### Q: How do I add more user roles?
**A:** Edit User.js model and add role checks in middleware

### Q: Can I restrict image file size?
**A:** Yes, in `backend/middleware/multer.js` limits

### Q: How do I make the app multilingual?
**A:** Use libraries like `react-i18next`

### Q: Can I add dark mode?
**A:** Yes, add CSS variables and toggle

---

## 🎯 Debug Tips

### 1. Check Browser Console (F12)
- Red errors = problems
- Yellow warnings = caution
- Look for network errors

### 2. Check Network Tab (F12)
- See API requests/responses
- Check status codes (200/400/500)
- View response data

### 3. Check Application Tab (F12)
- LocalStorage: Token, user data
- Cookies: Session info
- You can clear data here

### 4. Check Backend Logs
- Errors in terminal
- Request information
- Database operations

### 5. Use Console Logging
```javascript
// Frontend
console.log('Value:', value)

// Backend
console.log('Data:', data)
```

### 6. Test API Directly
```bash
curl http://localhost:5000/api/events/approved
```

### 7. Check File Permissions
- Are folders readable/writable?
- Can app access files?

### 8. Clear Cache
```javascript
// Browser console
localStorage.clear()
// or Ctrl+Shift+Delete
```

---

## 📞 Still Having Issues?

### Check These in Order:
1. ✅ Is backend running? (port 5000)
2. ✅ Is frontend running? (port 3000)
3. ✅ Is MongoDB running?
4. ✅ Are environment variables set?
5. ✅ Check browser console for errors
6. ✅ Check backend logs for errors
7. ✅ Clear browser cache
8. ✅ Restart both applications
9. ✅ Check file permissions

### Need More Help?
- Read README.md
- Check INSTALLATION_GUIDE.md
- Review API_TESTING_GUIDE.md
- Check code comments
- Search error message online

---

**Most issues are resolved by restarting both backend and frontend!** 🔄

---

**Last Resort:**
```bash
# Start fresh
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Good luck! 🚀
