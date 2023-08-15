import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NoMatch } from './pages/NoMatch';
import { Register } from './pages/Register';
import { Profile } from './pages/profile/Profile';
import { ProfileEdit } from './pages/profile/ProfileEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path='/profile/edit' element={<ProfileEdit />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>

  )
}

export default App
