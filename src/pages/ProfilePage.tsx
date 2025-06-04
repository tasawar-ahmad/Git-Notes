import styles from '../styles/ProfilePage.module.css';
import { useAuth } from '../contexts/authContext'; 
import { useGists } from '../hooks/useGists';
import Navbar from '../components/Navbar';

export default function UserProfilePage() {
    const { user } = useAuth();
    const { gists, loading, error } = useGists(false);
  
    if (!user) {
      return <p className={styles['info-msg']}>Please log in to view your profile and gists.</p>;
    }
  
    return (
        <div>
            <Navbar />
            <div className={styles['profile-container']}>
        <div className={styles['sidebar']}>
          <img className={styles['avatar']} src={user.avatar_url} alt="User Avatar" />
          <h3>{user.name || user.login}</h3>
          <a className={styles['btn']} href={user.html_url} target="_blank" rel="noreferrer">
            View GitHub Profile
          </a>
        </div>
  
        <div className={styles['gists-section']}>
          <h2>Your Gists <span className={styles['info']}>🛈</span></h2>
  
          {loading && <p>Loading gists...</p>}
          {error && <p>Error loading gists: {error}</p>}
  
          {gists
            .filter(gist => gist.owner.login === user.login)
            .map((gist) => (
              <div className={styles['gist-card']} key={gist.id}>
                <pre className={styles['code-snippet']}>
  {Object.values(gist.files)[0].content}
                </pre>
                <div className={styles['gist-meta']}>
                  <img src={gist.owner.avatar_url} alt="avatar" />
                  <div>
                    <strong>{gist.owner.login} / {Object.keys(gist.files)[0]}</strong>
                    <div className={styles['meta-sub']}>Updated {new Date(gist.updated_at).toLocaleString()}</div>
                  </div>
                </div>
                <p className={styles['gist-desc']}>
                  {gist.description || 'No description'}
                </p>
                <div className={styles['gist-actions']}>
                  <button>🔱 Fork</button>
                  <button>⭐ Star</button>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
    );
  }
  