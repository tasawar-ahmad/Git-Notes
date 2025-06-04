import { useState } from 'react';
import styles from '../styles/HomePage.module.css'
import Navbar from '../components/Navbar';
import GistGrid from '../components/GistGrid';
import GistTable from '../components/GistTable';

const HomePage = () => {
  const [view, setView] = useState<'card' | 'table'>('card');

  const handleToggle = (mode: 'card' | 'table') => {
    setView(mode);
  };
  return (
    <div>
    <Navbar />
    <main className={styles['page-container']}>
      <div className={styles['gist-view-header']}>
        <h2>Public Gists</h2>
        <div className={styles['view-toggle']}>
          <button
            className={`toggle-btn ${view === 'card' ? 'active' : ''}`}
            onClick={() => handleToggle('card')}
            title="Card View"
          >
            ▦
          </button>
          <button
            className={`toggle-btn ${view === 'table' ? 'active' : ''}`}
            onClick={() => handleToggle('table')}
            title="Table View"
          >
            ☰
          </button>
        </div>
        </div>
        {view === 'table' ? (
        <GistTable />
      ) : (
        <GistGrid />
      )}
    </main>
  </div>
)};
export default HomePage;