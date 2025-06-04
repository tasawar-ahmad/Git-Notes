import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import GistDetailPage from './pages/GistDetailPage';
import ProfilePage from './pages/ProfilePage';
import CreateGistPage from './pages/CreateGistPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gists/:id" element={<GistDetailPage />} />
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="/create" element={<CreateGistPage />} />
      </Routes>
    </Router>
  )
}

export default App