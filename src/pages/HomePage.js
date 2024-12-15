import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap'; 
import Navigation from '../components/Navigation';
import SearchBar from '../components/Searchbar';
import Trending from '../components/Trending';
import Recommended from '../components/Recommended';
import '../styles/home/home.scss';
import movieApi from '../utilities/movieApi';
import { search } from '../utilities/search';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults ] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errMsg, setErrMsg ] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMovies = async () => {
            try {
                setIsLoading(true);
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

    const isTrending = movies.filter((movie) => movie.isTrending);
    const recommended = movies.filter((movie) => !movie.isTrending);

    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const resultText = searchResults.length === 1 ? 'result' : 'results';

    const handleBookmark = (movieTitle) => {
        setMovies((prevMovies) =>
            prevMovies.map((movie) => 
              movie.title === movieTitle 
                ? { ...movie, isBookmarked: !movie.isBookmarked } 
                : movie 
            )
          );
    }

    return (
        <Container className="home-container">
            <Row className="nav-row">
                <Navigation />
            </Row>
            <Row className="home">
                <Col className="search-col">
                    <SearchBar 
                        movies={movies} 
                        onSearch={handleSearch}
                    />
                </Col>
                <Col className="trending-col">
                    {  
                        isLoading ? (
                            <Spinner animation="border" size="lg"/>
                        ) : searchTerm && searchResults.length > 0 ? (
                            <>
                                <h3 className="h3 sub-title">
                                    {
                                        `Found ${searchResults.length} 
                                        ${resultText} for ${searchTerm}
                                        `
                                    }
                                </h3>
                                <div className="results-container">
                                    {
                                        searchResults.map((movie) => {
                                            const {
                                                category,
                                                isBookmarked,
                                                isTrending,
                                                rating,
                                                thumbnail,
                                                title,
                                                year
                                            } = movie
                                            return (
                                                <MovieCard 
                                                    category={category}
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
                            </>
                        ) : searchTerm  && searchResults.length > 0 ? (
                            <Spinner animation="border" size="lg"/>
                        )  : (
                            <Trending 
                                isTrending={isTrending}
                                searchResults={searchResults}
                                searchTerm={searchTerm}
                                handleBookmark={handleBookmark}
                            />
                        )
                    }
                </Col>
                <Col className="recommend-col">
                    {
                        searchTerm && searchResults.length > 0 ? (
                            <></>
                        ) : (
                            <>
                            <h3 className="h3 sub-title">Recommended</h3>
                            <Recommended 
                                recommended={recommended}
                                searchResults={searchResults}
                                handleBookmark={handleBookmark}
                                
                            />
                            </>
                        )
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;