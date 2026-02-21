import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navigation.css';

export const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <h1>📰 Dayananda Sagar Institutions</h1>
          <p>College Newsletter & Event Portal</p>
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/newsletter" className="nav-link">
              Newsletter
            </Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-user">
                  {user.name} ({user.role.toUpperCase()})
                </span>
              </li>
              <li className="nav-item">
                <button className="nav-link login" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
