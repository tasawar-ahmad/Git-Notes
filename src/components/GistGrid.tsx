import GistCard from './GistCard';
import styles from '../styles/GistGrid.module.css';
import { useGists } from '../hooks/useGists';
import GistLoader from './GistLoader';

const GistGrid = () => {
  const { gists, loading, error } = useGists();

  if (loading) return <GistLoader type="grid" />;
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
