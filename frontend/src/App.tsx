import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NoMatch } from './pages/NoMatch';
import { Register } from './pages/Register';
import { Profile } from './pages/profile/Profile';
import { ProfileEdit } from './pages/profile/ProfileEdit';
import { RecipeDetails } from './pages/RecipeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path='/profile/edit' element={<ProfileEdit />} />
        <Route path='/recipe/:id' element={<RecipeDetails />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>

  )
}

export default App
