import { useState } from 'react';
import styles from '../styles/GistTable.module.css';
import { useGists } from '../hooks/useGists';
import GistRow from './GistRow';
import GistLoader from './GistLoader';
import Pagination from './Pagination';

const GistTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { gists, loading, error, totalPages } = useGists(true, currentPage, 8);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        />
    </div>
  );
};

export default GistTable;