import styles from '../styles/HomePage.module.css'
import Navbar from '../components/Navbar';
import GistTable from '../components/GistTable';
import Pagination from '../components/Pagination';

const HomePage = () => (
    <div>
    <Navbar />
    <main className={styles['page-container']}>
      <h2>Public Gists</h2>
      <GistTable />
      <Pagination />
    </main>
  </div>
);
export default HomePage;