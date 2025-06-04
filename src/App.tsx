import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import GistDetailPage from './pages/GistDetailPage/GistDetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CreateGistPage from './pages/CreateGistPage/CreateGistPage';

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