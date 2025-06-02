import styles from '../styles/Navbar.module.css';
const Navbar = () => (
    <header className={styles['navbar']}>
      <div className={styles['logo']}>EMUMBA</div>
      <div className={styles['search-login']}>
        <input
          type="text"
          placeholder="Search gists..."
          className={styles['search-input']}
        />
        <button className={styles['login-button']}>Login</button>
      </div>
    </header>
  );
  export default Navbar;
  