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
            path="/Entertainment-Web-App/login" 
            element={ isLoggedIn ? <Navigate to="/Entertainment-Web-App/home" /> : <LoginPage /> } 
          />
          <Route 
            path="/home" 
            element={ isLoggedIn ? <HomePage /> : <Navigate to="/Entertainment-Web-App/login" /> } 
          />
          <Route 
            path="/Entertainment-Web-App/signup"
            element={ <LoginPage /> } 
          />
           <Route 
            path="/Entertainment-Web-App/movies"
            element={ <Movies /> } 
          />
           <Route 
            path="/Entertainment-Web-App/tvseries"
            element={ <TVSeries /> } 
          />
           <Route 
            path="/Entertainment-Web-App/bookmarked"
            element={<Bookmarked /> } 
          />
      </Routes>
    </Container>
  );
}

export default App;
