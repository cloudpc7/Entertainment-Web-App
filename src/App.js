import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'; 
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import Bookmarked from './pages/Bookmarked';
import { Container  } from 'react-bootstrap';
import "./styles/main.scss";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Container className="app-container">
      <Routes>
        <Route 
          path="/login" 
          element={ 
            !isLoggedIn 
              ? <LoginPage /> 
              : <Navigate to="/home" state={{ from: location }} replace /> 
          } 
        />
        <Route 
          path="/home" 
          element={ 
            isLoggedIn 
              ? <HomePage /> 
              : <Navigate to="/login" state={{ from: location }} replace /> 
          } 
        />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvseries" element={<TVSeries />} />
        <Route path="/bookmarked" element={<Bookmarked />} />
      </Routes>
    </Container>
  );
}

export default App;