import styles from '../styles/GistTable.module.css';
import { useGists } from '../hooks/useGists';
import GistRow from './GistRow';

const GistTable = () => {
  const { gists, loading, error } = useGists();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <table className={styles['gist-table']}>
        <thead className={styles['gist-table-head']}>
          <tr>
            <th className={styles['gist-th']}>Name</th>
            <th className={styles['gist-th']}>Notebook Name</th>
            <th className={styles['gist-th']}>Keyword</th>
            <th className={styles['gist-th']}>Updated</th>
            <th className={styles['gist-th']}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gists.map((gist) => (
            <GistRow key={gist.id} gist={gist} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GistTable;