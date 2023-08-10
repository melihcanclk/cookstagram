import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NoMatch } from './pages/NoMatch';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from './styles/colors';

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: purple[700]
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            fontSize: '0.875rem',
            borderRadius: '12px 12px 0px 12px',
            '& fieldset': {
              borderColor: purple[900],
            },
            '&:hover fieldset': {
              borderColor: purple[700],
            },
            '&.Mui-focused fieldset': {
              borderColor: purple[400],
              boxShadow: '0 0 0 3px' + purple[200],
              border: '1px solid' + purple[400],
            },
          },
        },
      }
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </ThemeProvider>

  )
}

export default App
