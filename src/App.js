import { useState, useEffect } from 'react';
import movieApi from './utilities/movieApi';
import { search } from './utilities/search';
import "./styles/main.scss";
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import Bookmarked from './pages/Bookmarked';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function App() {

  const [searchResults, setSearchResults ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true)
          const moviesData = await movieApi();
          setMovies(moviesData);
          setIsLoading(false);
      } catch (error) {
          console.error(error);
          setIsLoading(false);
      }
    }
    getMovies();
  },[]);


  useEffect(() => {
    setIsLoading(true);
    const results = search(searchTerm,movies);
    setSearchResults(results);
    setIsLoading(false);
  }, [searchTerm, movies]);

  const handleBookmark = (movieTitle) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => 
        movie.title === movieTitle 
          ? { ...movie, isBookmarked: !movie.isBookmarked } 
          : movie 
      )
    );
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Container className="app-container">
      <Row className="app-row">
        <Col className="nav-col">
          <Navigation />
        </Col>
      </Row>
      <Routes>
        <Route path="/" element={
          <HomePage 
            movies={movies} 
            handleBookmark={handleBookmark} 
            isLoading={isLoading}
            searchTerm={searchTerm}
            searchResults={searchResults}
            handleSearch={handleSearch}
          />
        }          
        />
        <Route 
          path="/movies" 
          element={
            <Movies 
              movies={movies}
              handleBookmark={handleBookmark}
              handleSearch={handleSearch}
              isLoading={isLoading}
              searchTerm={searchTerm}
              searchResults={searchResults} 

            />
          }
        />
        <Route 
          path="/tvseries" 
          element={
            <TVSeries 
              movies={movies}
              handleBookmark={handleBookmark}
              handleSearch={handleSearch}
              isLoading={isLoading}
              searchTerm={searchTerm}
              searchResults={searchResults} 
            />
          }

        />
        <Route 
          path="/bookmarked" 
          element={
            <Bookmarked 
              movies={movies}
              handleBookmark={handleBookmark}
              handleSearch={handleSearch}
              isLoading={isLoading}
              searchTerm={searchTerm}
              searchResults={searchResults} 
            />
          }

        />
      </Routes>
    </Container>
  );
}

export default App;
