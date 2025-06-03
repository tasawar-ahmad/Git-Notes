import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import GistDetailPage from './pages/GistDetailPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gists/:id" element={<GistDetailPage />} />
        <Route path="/user/:username" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App