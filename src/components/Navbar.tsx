import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Navbar.module.css';
import { useAuth } from '../contexts/authContext';

const Navbar= () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = async () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (token) login(token);
  };

  return (
    <header className={styles['navbar']}>
      <div className={styles['logo']}>EMUMBA</div>
      <div className={styles['search-login']}>
        <input
          type="text"
          placeholder="Search gists..."
          className={styles['search-input']}
        />

        {!user ? (
          <button className={styles['login-button']} onClick={handleLogin}>
            Login
          </button>
        ) : (
          <div className={styles['user-section']} ref={dropdownRef}>
            <img
              src={user.avatar_url}
              alt={user.login}
              className={styles['avatar']}
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div className={styles['dropdown']}>
                <div className={styles['dropdown-header']}>
                  Signed in as <strong>{user.name || user.login}</strong>
                </div>
                <a href="https://gist.github.com" target="_blank" rel="noreferrer">
                  Your gists
                </a>
                <a href="https://gist.github.com/starred" target="_blank" rel="noreferrer">
                  Starred gists
                </a>
                <div onClick={() => navigate(`/user/${user.login}`)}>
                  Your GitHub profile
                </div>
                <a href="https://docs.github.com" target="_blank" rel="noreferrer">
                  Help
                </a>
                <button onClick={logout}>Sign out</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
