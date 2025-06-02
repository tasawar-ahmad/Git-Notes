import styles from '../styles/Pagination.module.css';

const Pagination = () => (
    <div className={styles['pagination-container']}>
        <div className={styles['pagination-controls']}>
            <button className={styles['pagination-btn']}>&lt;</button>
            <span>Page</span>
            <input
                type="text"
                value="1"
                className={styles['pagination-input']}
                readOnly
            />
            <span>of 14</span>
            <button className={styles['pagination-btn']}>&gt;</button>
        </div>
    </div>
);

export default Pagination;