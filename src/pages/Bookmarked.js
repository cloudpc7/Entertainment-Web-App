import { Container, Row, Col, Spinner } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import '../styles/movies/movies.scss';
import '../styles/search/search.scss';
import Searchbar from '../components/Searchbar';
import Navigation from '../components/Navigation';

import { useContext } from 'react';
import MovieContext  from '../MovieContext';

const Bookmarked = () => {
    const {moviesArray, handleBookmark, loading, searchTerm, searchResults, handleSearch} = useContext(MovieContext);
    const bookMarked = moviesArray.filter((movie) => movie.isBookmarked);
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
                                <div className="results-container">
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
                                <h3 className="h3 sub-title">Bookmarked</h3>
                                <Col className="movies-col">
                                    {
                                        bookMarked.map((movie) => {
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

export default Bookmarked;