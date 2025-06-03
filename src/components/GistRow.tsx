import { formatDistanceToNow } from 'date-fns';
import styles from '../styles/GistRow.module.css';
import type { Gist } from '../hooks/useGists';

interface Props {
  gist: Gist;
}

const GistRow = ({ gist }: Props) => {
  const fileNames = Object.keys(gist.files);
  const firstFile = gist.files[fileNames[0]];
  return (
    <tr className={styles['gist-row']}>
      <td className={styles['gist-user']}>
        <img src={gist.owner.avatar_url} alt="avatar" className={styles['avatar']} />
        <span>{gist.owner.login}</span>
      </td>
      <td className={styles['gist-cell']}>{firstFile.filename}</td>
      <td className={styles['gist-cell']}>
        <span className={styles['keyword-pill']}>{firstFile.language || 'N/A'}</span>
      </td>
      <td className={styles['gist-cell']}>{formatDistanceToNow(new Date(gist.updated_at), { addSuffix: true })}</td>

    </tr>
  );
};

export default GistRow;