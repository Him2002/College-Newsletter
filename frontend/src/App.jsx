import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { HodDashboard } from './pages/HodDashboard';
import { Newsletter } from './pages/Newsletter';
import './styles/globals.css';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading" style={{ height: '100vh' }}>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navigation />
        <div className="container page-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route
              path="/login"
              element={user ? <Navigate to={user.role === 'hod' ? '/hod-dashboard' : '/student-dashboard'} /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to={user.role === 'hod' ? '/hod-dashboard' : '/student-dashboard'} /> : <Register />}
            />
            <Route
              path="/student-dashboard"
              element={<ProtectedRoute
                component={<StudentDashboard />}
                requiredRole={null}
              />}
            />
            <Route
              path="/hod-dashboard"
              element={<ProtectedRoute
                component={<HodDashboard />}
                requiredRole="hod"
              />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
