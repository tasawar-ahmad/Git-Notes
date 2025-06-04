import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useGistDetail } from '../../hooks/useGistDetail';
import styles from './GistDetailPage.module.css';
import Navbar from '../../components/Navbar/Navbar';

const GistDetailPage = () => {
  const { id } = useParams();
  const { gist, loading, error } = useGistDetail(id!);

  if (loading) return <div>Loading gist...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gist) return <div>No gist found.</div>;

  const file = Object.values(gist.files)[0];

  return (
    <div>
    <Navbar />
    <div className={styles['gist-detail-wrapper']}>
      <header className={styles['gist-header']}>
        <div className={styles['gist-user']}>
          <img src={gist.owner.avatar_url} alt="User" className={styles['avatar']} />
          <div className={styles['user-info']}>
            <p><strong>{gist.owner.login}</strong> / <span className={styles['gist-name']}>{file.filename}</span></p>
            <p className={styles['meta']}>Created {formatDistanceToNow(new Date(gist.created_at), { addSuffix: true })}</p>
            <p className={styles['description']}>{gist.description}</p>
          </div>
        </div>
        <div className={styles['gist-actions']}>
          <button className={styles['btn']}>
            <span className={styles['icon']}>🔀</span> Fork <span className={styles['count']}>{gist.forks.length}</span>
          </button>
          <button className={styles['btn']}>
            <span className={styles['icon']}>⭐</span> Star <span className={styles['count']}>528</span>
          </button>
        </div>
      </header>

      <section className={styles['file-container']}>
        <div className={styles['file-header']}>{file.filename}</div>
        <pre className={styles['code-block']}>{file.content}</pre>
      </section>
    </div>
    </div>
  );
};

export default GistDetailPage;
