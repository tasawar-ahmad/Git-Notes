import GistCard from '../GistCard/GistCard';
import styles from './GistGrid.module.css';
import { useGists } from '../../hooks/useGists';
import GistLoader from '../GistLoader/GistLoader';

const GistGrid = ({currentPage}: {currentPage: number}) => {
  const { gists, loading, error } = useGists(true, currentPage);

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
