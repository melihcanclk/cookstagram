import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NoMatch } from './pages/NoMatch';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<NoMatch />} />
        <Route path="*" element={<Navigate to="/notmatch" />} />
      </Routes>
    </Router>

  )
}

export default App
