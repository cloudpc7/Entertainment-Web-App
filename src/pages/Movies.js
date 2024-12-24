import { Container, Row, Col, Spinner, Nav } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import MovieCard from '../components/MovieCard';
import '../styles/movies/movies.scss';
import '../styles/search/search.scss';
import Searchbar from '../components/Searchbar';

import { useContext } from 'react';
import MovieContext  from '../MovieContext';

const Movies = () => {
    const {moviesArray, handleBookmark, loading, searchTerm, searchResults, handleSearch} = useContext(MovieContext);
    const isMovies = moviesArray.filter((movie) => movie.category === 'Movie');
    return (
        <Container className="movie-container">
            <Navigation />
                {
                    <Container className="movies">
                        <Row className="movie-row">
                            <Col className="search-col">
                                <Searchbar 
                                    searchResults={searchResults}
                                    searchTerm={searchTerm}
                                    onSearch={handleSearch}
                                    loading={loading}
                                />
                            </Col>
                        {
                            loading ? (
                                <Spinner animation="border" size="lg"/>
                            ) : searchTerm && searchResults.length > 0 ? (
                                <div className="search-results">
                                    {
                                        searchResults.map((movie) => {
                                            const {
                                                category,
                                                isBookmarked,
                                                rating,
                                                thumbnail,
                                                title,
                                                year
                                            } = movie
                                            const {small, medium, large } = thumbnail.regular;
                                            return (
                                                <MovieCard 
                                                    category={category}
                                                    isBookmarked={isBookmarked}
                                                    handleBookmark={handleBookmark}
                                                    rating={rating}
                                                    small={small}
                                                    medium={medium}
                                                    larg={large}
                                                    title={title}
                                                    year={year}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <>
                                <h3 className="h3 sub-title movies">Movies</h3>
                                <Col className="movies-col">
                                    {
                                        isMovies.map((movie) => {
                                            const {
                                                category, 
                                                isBookmarked, 
                                                rating,
                                                thumbnail,
                                                title,
                                                year
                                                } = movie;
                                            const {small, medium, large } = thumbnail.regular;
                            
                                            return (
                                                <MovieCard 
                                                    key={title}
                                                    category={category}
                                                    isBookmarked={isBookmarked}
                                                    handleBookmark={handleBookmark}
                                                    rating={rating}
                                                    small={small}
                                                    medium={medium}
                                                    larg={large}
                                                    title={title}
                                                    year={year}
                                                />
                                            )
                                        })
                                    }
                                </Col>
                                </>
                                )
                            }
                        </Row>  
                    </Container>
                }
        </Container>
    )
}

export default Movies;