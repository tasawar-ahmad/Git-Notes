import styles from '../styles/GistTable.module.css';
import GistRow from './GistRow';

const dummyUsers = Array(9).fill({
  name: 'John Doe',
  avatar: 'src/assets/user-profile.jpg',
});

const GistTable = () => (
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
        {dummyUsers.map((user, idx) => (
          <GistRow key={idx} user={user} />
        ))}
      </tbody>
    </table>
  </div>
);

export default GistTable;