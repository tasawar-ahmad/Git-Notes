import '../styles/Navbar.css';
const Navbar = () => (
    <header className="navbar">
      <div className="logo">EMUMBA</div>
      <div className="search-login">
        <input
          type="text"
          placeholder="Search gists..."
          className="search-input"
        />
        <button className="login-button">Login</button>
      </div>
    </header>
  );
  export default Navbar;
  