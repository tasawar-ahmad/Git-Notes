import '../styles/HomePage.css'
import Navbar from '../components/Navbar';
import GistTable from '../components/GistTable';
import Pagination from '../components/Pagination';

const HomePage = () => (
    <div>
    <Navbar />
    <main className='page-container'>
      <h2>Public Gists</h2>
      <GistTable />
      <Pagination />
    </main>
  </div>
);
export default HomePage;
