import { Container, Row, Col, Spinner } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import '../styles/movies/movies.scss';
import '../styles/search/search.scss';
import Searchbar from '../components/Searchbar';

const Bookmarked = ({ 
    movies, 
    handleBookmark, 
    searchTerm, 
    searchResults, 
    handleSearch,
    isLoading 
    }) => {

    const bookMarked = movies.filter((movie) => movie.isBookmarked);
    console.log(isLoading);
    return (
        <>
        {

            <Container className="movie-container">
                <Row className="movie-row">
                    <Col className="search-col">
                        <Searchbar 
                            searchResults={searchResults}
                            searchTerm={searchTerm}
                            onSearch={handleSearch}
                            isLoading={isLoading}
                        />
                    </Col>
                        {
                                isLoading ? (
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
                                            return (
                                                <MovieCard 
                                                    category={category}
                                                    isBookmarked={isBookmarked}
                                                    handleBookmark={handleBookmark}
                                                    rating={rating}
                                                    thumbnail={thumbnail}
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
                            
                                            return (
                                                <MovieCard 
                                                    key={title}
                                                    category={category}
                                                    isBookmarked={isBookmarked}
                                                    handleBookmark={handleBookmark}
                                                    rating={rating}
                                                    thumbnail={thumbnail}
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
        </>
    )
}

export default Bookmarked;