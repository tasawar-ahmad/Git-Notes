import styles from '../styles/GistLoader.module.css';

type Props = {
  type: 'table' | 'grid';
  count?: number;
};

const GistLoader = ({ type, count = 5 }: Props) => {
  const placeholders = Array.from({ length: count });

  return (
    <div className={type === 'grid' ? styles.gridWrapper : styles.tableWrapper}>
      {placeholders.map((_, index) => (
        <div
          key={index}
          className={type === 'grid' ? styles.gridItem : styles.tableRow}
        />
      ))}
    </div>
  );
};

export default GistLoader;
