import styles from '../styles/GistRow.module.css';

const GistRow = ({ user }) => (
  <tr className={styles['gist-row']}>
    <td className={styles['gist-user']}>
      <img src={user.avatar} alt="avatar" className={styles['avatar']} />
      <span>{user.name}</span>
    </td>
    <td className={styles['gist-cell']}>Notebook Name</td>
    <td className={styles['gist-cell']}>
      <span className={styles['keyword-pill']}>Keyword</span>
    </td>
    <td className={styles['gist-cell']}>Last updated a few hours ago</td>

  </tr>
);

export default GistRow;