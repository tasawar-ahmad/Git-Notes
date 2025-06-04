import styles from '../styles/Pagination.module.css';

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => (
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
            <span>of {totalPages}</span>
            <button 
                className={styles['pagination-btn']}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >&gt;</button>
        </div>
    </div>
);

export default Pagination;