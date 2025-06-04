import styles from './Pagination.module.css';

interface Props {
    currentPage: number;
    onPageChange: (page: number) => void;
}
const Pagination = ({ currentPage, onPageChange }: Props) => (
    <div className={styles['pagination-container']}>
        <div className={styles['pagination-controls']}>
            <button 
                className={styles['pagination-btn']}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >&lt;</button>
            <span>Page</span>
            <input
                type="text"
                value={currentPage}
                className={styles['pagination-input']}
                readOnly
            />
            <button 
                className={styles['pagination-btn']}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === 100}
            >&gt;</button>
        </div>
    </div>
);

export default Pagination;