import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NoMatch } from './pages/NoMatch';
import { Register } from './pages/Register';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<NoMatch />} />
        <Route path="*" element={<Navigate to="/notmatch" />} />
      </Routes>
    </Router>

  )
}

export default App
