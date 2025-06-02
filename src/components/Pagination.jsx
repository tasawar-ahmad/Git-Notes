import '../styles/Pagination.css';

const Pagination = () => (
    <div className="pagination-container">
        <div className="pagination-controls">
            <button className="pagination-btn">&lt;</button>
            <span>Page</span>
            <input
                type="text"
                value="1"
                className="pagination-input"
                readOnly
            />
            <span>of 14</span>
            <button className="pagination-btn">&gt;</button>
        </div>
    </div>
);

export default Pagination;
