import { Container, Row, Col, Spinner } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import '../styles/movies/movies.scss';
import Searchbar from '../components/Searchbar';
import Navigation from '../components/Navigation';
import { useContext } from 'react';
import MovieContext  from '../MovieContext';

const Bookmarked = () => {
    const {moviesArray, handleBookmark, loading, searchTerm, searchResults, handleSearch} = useContext(MovieContext);
    const bookMarked = moviesArray.filter((movie) => movie.isBookmarked);
    const bookmarkedMovies = bookMarked.filter((movie) => movie.category === 'Movie');
    const bookmarkedTVSeries = bookMarked.filter((movie) => movie.category === 'TV Series');
    return (
        <>
            {

                <Container className="movies">
                    <Navigation />
                        <Searchbar 
                            searchResults={searchResults}
                            searchTerm={searchTerm}
                            onSearch={handleSearch}
                            loading={loading}
                        />
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
                                    <Container className="movie-page-container">
                                        <div className="movie-bookmark">
                                            <h3 className="h3 sub-title movies-title">Bookmarked Movies</h3>
                                            <div className="movie-card-div">
                                                {
                                                    bookmarkedMovies.map((movie) => {
                                                        const {
                                                            category,
                                                            isBookmarked,
                                                            rating,
                                                            thumbnail,
                                                            title,
                                                            year
                                                        } =  movie
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
                                                                large={large} 
                                                                title={title}
                                                                year={year}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="tv-bookmark">
                                            <h3 className="h3 sub-title movies-title">Bookmarked TV Series</h3>
                                            <div className="movie-card-div">   
                                                {
                                                    bookmarkedTVSeries.map((movie) => {
                                                        const {
                                                        category,
                                                        isBookmarked,
                                                        rating,
                                                        thumbnail,
                                                        title,
                                                        year
                                                    } =  movie
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
                                                                large={large} 
                                                                title={title}
                                                                year={year}
                                                            />
                                                        )
                                                    })
                                            }
                                            </div>
                                        </div>
                                    </Container>
                                </>
                            )
                        } 
                </Container>
            }
        </>
    )
}

export default Bookmarked;