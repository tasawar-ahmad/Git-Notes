import styles from './GistTable.module.css';
import { useGists } from '../../hooks/useGists';
import GistRow from '../GistRow/GistRow';
import GistLoader from '../GistLoader/GistLoader';

const GistTable = ({currentPage}: {currentPage: number}) => {
  const { gists, loading, error } = useGists(true, currentPage, 8);

  if (loading) return <GistLoader type="table" />;
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