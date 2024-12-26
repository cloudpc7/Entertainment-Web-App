import { Container, Spinner } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import MovieCard from '../components/MovieCard';
import '../styles/movies/movies.scss';
import Searchbar from '../components/Searchbar';

import { useContext } from 'react';
import MovieContext  from '../MovieContext';

const Movies = () => {
    const {moviesArray,  searchResults,loading, searchTerm, handleBookmark, handleSearch} = useContext(MovieContext);
    const isMovies = moviesArray.filter((movie) => movie.category === 'Movie');
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
                                        const {small, medium, large } = thumbnail;
                                        return (
                                            <MovieCard 
                                                key={title}
                                                category={category}
                                                isBookmarked={isBookmarked}
                                                rating={rating}
                                                small={small}
                                                medium={medium}
                                                larg={large}
                                                title={title}
                                                year={year}
                                                handleBookmark={handleBookmark}
                                            />
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <>
                            <h3 className="h3 sub-title movies-title">Movies</h3>
                            <Container className="movie-page-container">
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
                                        const {medium, large, small } = thumbnail.regular; 
                                        return (
                                            <MovieCard 
                                                key={title}
                                                category={category}
                                                isBookmarked={isBookmarked}
                                                rating={rating}
                                                small={small}
                                                medium={medium}
                                                larg={large}
                                                title={title}
                                                year={year}
                                                handleBookmark={handleBookmark}
                                            />
                                        )
                                    })
                                }
                            </Container>
                            </>
                            )
                        }
                </Container>
            }
        </>
    )
}

export default Movies;