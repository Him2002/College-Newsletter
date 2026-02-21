# Frontend - Dayananda Sagar Institutions Newsletter System

React.js + Vite frontend for the college event management system.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **vite** - Build tool

## 📂 Structure

```
src/
├── pages/          - Page components
├── components/     - Reusable UI components
├── context/        - React Context (Auth)
├── services/       - API calls (axios)
├── styles/         - CSS files
├── App.jsx         - Main app component
└── main.jsx        - Entry point
```

## 🎨 Pages

- **LandingPage** - Home page with info and CTAs
- **Login** - User login form
- **Register** - User registration form
- **StudentDashboard** - Student's event management
- **HodDashboard** - HOD's event approval panel
- **Newsletter** - Public event listing

## 🔐 Authentication

- JWT tokens stored in localStorage
- Automatic token refresh on page reload
- Protected routes with role-based access
- Context API for global auth state

## 🛣️ Routes

- `/` - Landing page (public)
- `/login` - Login page (public)
- `/register` - Registration page (public)
- `/newsletter` - Newsletter (public)
- `/student-dashboard` - Student dashboard (protected)
- `/hod-dashboard` - HOD dashboard (protected, role check)

## 🎯 Components

### Navigation
- Top navigation bar
- User info display
- Logout button
- Logo/branding

### ProtectedRoute
- Route wrapper
- Checks authentication
- Redirects if not logged in
- Role-based access control

## 🌐 Environment Variables

```
VITE_API_URL=http://localhost:5000/api
```

## 🎨 Styling

All styling is CSS (no CSS frameworks needed):
- `globals.css` - Global styles
- `Navigation.css` - Navigation styling
- `Auth.css` - Login/Register styling
- `LandingPage.css` - Landing page styling
- `Dashboard.css` - Dashboard styling
- `Newsletter.css` - Newsletter styling

## 🚀 Build & Deploy

### Build
```bash
npm run build
```

Generates optimized files in `dist/` folder.

### Preview Build
```bash
npm run preview
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build: `npm run build`
2. Drag `dist/` folder to Netlify
3. Set environment variables

## 🔌 API Integration

Using Axios with interceptors:
- Automatic token injection in headers
- Automatic logout on 401 errors
- Centralized API base URL

**File:** `src/services/api.js`

## 📝 Auth Context

Global auth state using React Context:
- Store user info
- Store JWT token
- Provide login/logout methods
- Authentication status

**File:** `src/context/AuthContext.jsx`

## 🎯 Development Tips

1. **Hot Module Reload** - Changes auto-refresh
2. **DevTools** - Check console for errors
3. **Network Tab** - Inspect API calls
4. **Application Tab** - Check localStorage
5. **Components Tab** - Debug React components

## 🧪 Testing in Browser

1. Open `http://localhost:3000`
2. Check console (F12) for errors
3. Check Network tab for API calls
4. Test all pages and features
5. Verify image uploads work

## 🚀 Production Checklist

- [ ] Change VITE_API_URL to production backend
- [ ] Run `npm run build`
- [ ] Test build: `npm run preview`
- [ ] Minimize console logs
- [ ] Add analytics tracking
- [ ] Enable gzip compression
- [ ] Cache busting for assets

## 📱 Responsive Design

Mobile breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

All pages are fully responsive.

## ⚡ Performance Tips

- Code splitting via React Router
- Image optimization
- CSS minification
- Bundle size analysis

```bash
npm install -g vite-plugin-visualizer
```

## 🔄 State Management

Using only React Context API (no Redux):
- AuthContext for user/token
- Component-level useState for forms
- Lifted state for shared data

---

Made for Dayananda Sagar Institutions ✨

## 🎨 Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```
