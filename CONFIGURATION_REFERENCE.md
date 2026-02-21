# ⚙️ Configuration Reference

Complete configuration guide for all environment variables and settings.

---

## 🔧 Backend Configuration

### .env File Location
```
backend/.env
```

### Complete .env Template

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/dayananda_newsletter

# JWT Configuration
JWT_SECRET=generate_a_strong_random_string_here_minimum_32_chars

# Optional - For Production
# CORS_ORIGIN=https://yourdomain.com
# UPLOAD_LIMIT=5000000
```

### Environment Variables Explained

#### PORT
- **What:** Server listening port
- **Default:** 5000
- **Values:** Any available port number
- **Production:** Use port 80 or 443 with reverse proxy

**Example:**
```env
PORT=5000
```

#### NODE_ENV
- **What:** Environment type
- **Default:** development
- **Values:** `development` or `production`
- **Purpose:** Enable/disable debug features

**Example:**
```env
NODE_ENV=development
NODE_ENV=production
```

#### MONGODB_URI
- **What:** MongoDB connection string
- **Format (Local):** `mongodb://host:port/database`
- **Format (Atlas):** `mongodb+srv://username:password@cluster.mongodb.net/database`
- **Purpose:** Connect to database

**Examples:**

Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/dayananda_newsletter
```

MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://app_user:MyPassword123@cluster0.abc123.mongodb.net/dayananda_newsletter
```

#### JWT_SECRET
- **What:** Secret key for signing JWT tokens
- **Minimum:** 32 characters
- **Must be:** Random and unique
- **Purpose:** Secure authentication tokens

**Generate JWT_SECRET:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

**Example output:**
```
a7f3b9c2e8d5f1a4b9c7e3d2f5a1b4c7d9e3f2a5b8c1d4e7f0a3b6c9d2e5f8
```

**Add to .env:**
```env
JWT_SECRET=a7f3b9c2e8d5f1a4b9c7e3d2f5a1b4c7d9e3f2a5b8c1d4e7f0a3b6c9d2e5f8
```

---

## 🎨 Frontend Configuration

### .env File Location
```
frontend/.env
```

### Complete .env Template

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Optional - For Development
# VITE_LOG_LEVEL=debug

# Optional - For Production
# VITE_API_URL=https://api.yourdomain.com/api
```

### Environment Variables Explained

#### VITE_API_URL
- **What:** Backend API base URL
- **Default:** http://localhost:5000/api
- **Development:** Point to local backend
- **Production:** Point to your hosted backend

**Examples:**

Local Development:
```env
VITE_API_URL=http://localhost:5000/api
```

Remote Development:
```env
VITE_API_URL=http://192.168.1.100:5000/api
```

Production (Render):
```env
VITE_API_URL=https://dayananda-backend.onrender.com/api
```

Production (Heroku):
```env
VITE_API_URL=https://dayananda-backend.herokuapp.com/api
```

Custom Domain:
```env
VITE_API_URL=https://api.dayananda.edu/api
```

---

## 🗄️ MongoDB Configuration

### Two Options: Local or Cloud

#### Option 1: Local MongoDB

**Connection String:**
```
mongodb://localhost:27017/dayananda_newsletter
```

**Breakdown:**
- `mongodb://` - Protocol
- `localhost` - Server address
- `27017` - Port
- `dayananda_newsletter` - Database name

**In .env:**
```env
MONGODB_URI=mongodb://localhost:27017/dayananda_newsletter
```

#### Option 2: MongoDB Atlas (Cloud)

**Connection String:**
```
mongodb+srv://username:password@cluster.mongodb.net/database
```

**Breakdown:**
- `mongodb+srv://` - Secure connection protocol
- `username:password` - Database credentials
- `cluster.mongodb.net` - Atlas cluster address
- `database` - Database name

**In .env:**
```env
MONGODB_URI=mongodb+srv://app_user:MySecurePass123@cluster0.abc123.mongodb.net/dayananda_newsletter
```

### Database Name
```
dayananda_newsletter
```

### Collections
Automatically created:
- `users` - User accounts
- `events` - Event submissions

---

## 🔐 Security Settings

### JWT Configuration

**Token Expiry:**
```javascript
// In: backend/controllers/authController.js
expiresIn: '7d' // 7 days
// Options: '24h', '7d', '30d', '1y'
```

Change if needed:
```javascript
const token = jwt.sign(
  { id, role, department },
  process.env.JWT_SECRET,
  { expiresIn: '30d' } // 30 days
);
```

### Password Hashing

**Salt Rounds:**
```javascript
// In: backend/models/User.js
const salt = await bcrypt.genSalt(10);
// 10 = good balance between security and speed
// Higher = more secure but slower
// Range: 8-12
```

### CORS Configuration

**In:** `backend/server.js`

```javascript
app.use(cors()); // Allow all origins (dev only)

// Production: Specific origins
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### File Upload Limits

**In:** `backend/middleware/multer.js`

```javascript
limits: {
  fileSize: 5 * 1024 * 1024 // 5MB
}
```

Change if needed:
```javascript
limits: {
  fileSize: 10 * 1024 * 1024 // 10MB
}
```

---

## 📦 Application Settings

### Server Defaults

```javascript
// Port
PORT = 5000

// Host
HOST = localhost

// API Prefix
/api

// Upload Directory
uploads/

// Max JSON payload
100kb
```

### Frontend Defaults

```javascript
// Dev Server Port
3000

// Build Output
dist/

// API Base URL
http://localhost:5000/api

// Token Storage
localStorage

// Token Key
'token'

// User Storage Key
'user'
```

### Database Defaults

```javascript
// Collections
users
events

// Index
users.email // unique

// Auto Fields
createdAt // timestamp
updatedAt // timestamp (on update)
month // auto-calculated from eventDate
year // auto-calculated from eventDate
```

---

## 🚀 Environment-Specific Configs

### Development

**backend/.env:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dayananda_newsletter
JWT_SECRET=dev_secret_key_not_for_production
```

**frontend/.env:**
```env
VITE_API_URL=http://localhost:5000/api
```

### Staging

**backend/.env:**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@staging-cluster.mongodb.net/dayananda_newsletter
JWT_SECRET=staging_secret_key_generate_new
```

**frontend/.env:**
```env
VITE_API_URL=https://staging-api.yourdomain.com/api
```

### Production

**backend/.env:**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@prod-cluster.mongodb.net/dayananda_newsletter
JWT_SECRET=production_secret_key_generate_unique
```

**frontend/.env:**
```env
VITE_API_URL=https://api.dayananda.edu/api
```

---

## 📝 Configuration Checklist

### Before Running Backend
- [ ] MongoDB is installed/accessible
- [ ] .env file created in backend folder
- [ ] PORT is set
- [ ] MONGODB_URI is correct
- [ ] JWT_SECRET is set and strong

### Before Running Frontend
- [ ] .env file created in frontend folder
- [ ] VITE_API_URL points to backend
- [ ] Backend is running on expected port

### Before Deployment
- [ ] Change JWT_SECRET to production value
- [ ] Use MongoDB Atlas (not local)
- [ ] Set NODE_ENV=production
- [ ] Update CORS origins
- [ ] Use HTTPS URLs
- [ ] Set proper backend origin in CORS
- [ ] Enable rate limiting
- [ ] Configure monitoring

---

## 🔄 Common Configuration Changes

### Change Server Port

**backend/.env:**
```env
PORT=3000
```

Then restart backend.

### Change Frontend API URL

**frontend/.env:**
```env
VITE_API_URL=http://your-backend:5000/api
```

Then restart frontend.

### Change Database

**backend/.env:**
```env
MONGODB_URI=mongodb+srv://new_user:pass@new_cluster.mongodb.net/new_db
```

Then restart backend.

### Change JWT Secret

**backend/.env:**
```env
JWT_SECRET=new_super_secret_key_here
```

Then logout all users and restart backend.

### Increase File Upload Limit

**backend/middleware/multer.js:**
```javascript
limits: {
  fileSize: 50 * 1024 * 1024 // 50MB
}
```

Then restart backend.

### Increase Token Expiry

**backend/controllers/authController.js:**
```javascript
expiresIn: '60d' // 60 days instead of 7
```

Then restart and users login again.

---

## 🆘 Configuration Issues

### "ENOENT: no such file or directory, open '.env'"

**Cause:** .env file doesn't exist

**Solution:**
```bash
# In backend or frontend directory
cp .env.example .env
# Then edit .env with real values
```

### "MongoDB connection refused"

**Cause:** MONGODB_URI is wrong or MongoDB not running

**Solution:**
1. Check MongoDB connection string
2. Verify MongoDB is running
3. Check username/password for Atlas

### "Cannot find module" errors

**Cause:** .env not loaded yet

**Solution:**
1. Ensure .env file exists
2. Restart the application
3. Check NODE_ENV setting

### "Token verification failed"

**Cause:** JWT_SECRET changed between runs

**Solution:**
- Don't change JWT_SECRET without logout all users
- Or users must logout and login again

### "CORS error"

**Cause:** Frontend URL not in CORS whitelist

**Solution:**
- Update CORS origin
- Or rebuild backend with new CORS setting

---

## 📊 Configuration Summary

| Setting | Backend | Frontend | Required |
|---------|---------|----------|----------|
| PORT | ✅ | ❌ | Yes |
| NODE_ENV | ✅ | ❌ | Yes |
| MONGODB_URI | ✅ | ❌ | Yes |
| JWT_SECRET | ✅ | ❌ | Yes |
| VITE_API_URL | ❌ | ✅ | Yes |

---

## ✅ Verification Commands

### Verify MongoDB Connection
```bash
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/dbname"
```

### Verify Backend Starting
```bash
cd backend
npm run dev
# Should show: Server running on port 5000
```

### Verify Frontend Starting
```bash
cd frontend
npm run dev
# Should show: Local: http://localhost:3000/
```

### Verify API Connection
```bash
curl http://localhost:5000/api/events/approved
```

---

## 📚 Additional Resources

- [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/)
- [JWT.io](https://jwt.io/) - Learn about JWT
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)

---

**Configuration is complete when:**
- ✅ Backend starts without errors
- ✅ Frontend connects to backend
- ✅ Can register and login
- ✅ API requests work
- ✅ Database operations work

---

**Keep these values secure!** 🔐
