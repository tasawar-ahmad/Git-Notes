import GistCard from './GistCard';
import styles from '../styles/GistGrid.module.css';
import { useGists } from '../hooks/useGists';

const GistGrid = () => {
  const { gists, loading, error } = useGists();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading gists</p>;

  return (
    <>
      <div className={styles['gist-grid']}>
        {gists.map((gist) => (
          <GistCard key={gist.id} gist={gist} />
        ))}
      </div>
    </>
  );
};

export default GistGrid;
