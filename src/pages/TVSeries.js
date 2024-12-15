import { Container, Row, Col, Spinner } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import '../styles/movies/movies.scss';
import '../styles/search/search.scss';
import Searchbar from '../components/Searchbar';

const TVSeries = ({ 
    movies, 
    handleBookmark, 
    searchTerm, 
    searchResults, 
    handleSearch,
    isLoading 
    }) => {

    const tvSeries = movies.filter((movie) => movie.category === 'TV Series');
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
                                <h3 className="h3 sub-title">TV Series</h3>
                                <Col className="movies-col">
                                
                                    {
                                        tvSeries.map((movie) => {
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

export default TVSeries;