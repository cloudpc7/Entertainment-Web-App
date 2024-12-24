import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import Bookmarked from './pages/Bookmarked';
import { Container  } from 'react-bootstrap';
import "./styles/main.scss";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Container className="app-container">
      <Routes>
        <Route 
            path="/login" 
            element={ isLoggedIn ? <Navigate to="/home" /> : <LoginPage /> } 
          />
          <Route 
            path="/home" 
            element={ isLoggedIn ? <HomePage /> : <Navigate to="/login" /> } 
          />
          <Route 
            path="/signup"
            element={ <LoginPage /> } 
          />
           <Route 
            path="/movies"
            element={ <Movies /> } 
          />
           <Route 
            path="/tvseries"
            element={ <TVSeries /> } 
          />
           <Route 
            path="/bookmarked"
            element={<Bookmarked /> } 
          />
      </Routes>
    </Container>
  );
}

export default App;
