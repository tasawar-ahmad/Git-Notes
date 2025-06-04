import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/GistCard.module.css';
import type { Gist } from '../hooks/useGists';

interface Props {
  gist: Gist;
}

const GistCard = ({ gist }: Props) => {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/gists/${gist.id}`);
  };
  const firstFile = Object.values(gist.files)[0];

  return (
    <div className={styles['gist-card']} onClick={handleClick}>
      <pre className={styles['gist-snippet']}>
        {firstFile.content}
      </pre>
      <div className={styles['gist-footer']}>
        <img src={gist.owner.avatar_url} alt="avatar" className={styles['avatar']} />
        <div>
          <strong>{gist.owner.login}</strong> / {firstFile.filename}
          <p className={styles['desc']}>{gist.description || 'No description'}</p>
          <small>
            Updated {formatDistanceToNow(new Date(gist.updated_at), { addSuffix: true })}
          </small>
        </div>
      </div>
    </div>
  );
};

export default GistCard;
