import { useContext } from 'react';
import MovieContext  from '../MovieContext';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Trending from '../components/Trending';
import Recommended from '../components/Recommended';
import Searchbar from '../components/Searchbar';
import '../styles/home/home.scss';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
    const { searchResults, moviesArray, loading, searchTerm, handleBookmark } = useContext(MovieContext);
    const resultText = searchResults.length === 1 ? 'result' : 'results';
    console.log()
    return (
        <Container className="home-container">
            <Navigation />
            <Searchbar/>
            {
                loading ? (
                    <Spinner className="spinner" animation="border" size="sm"/>
                ) : searchTerm && searchResults.length > 0 ? (
                    <>
                        <h3 className="h3 sub-title found">{
                            `Found ${searchResults.length} ${resultText} for ${searchTerm}`
                        }
                        </h3>
                        <div className="search-results">
                            {
                                searchResults.map((movie) => {

                                    const {category, isBookmarked, rating,thumbnail,title,year} = movie;
                                    const { small, medium, large } = thumbnail.regular;
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
                    </>
                ) : (
                    <>
                        <h3 className="h3 sub-title trend">Trending</h3>
                        <Trending />
                        <h3 className="h3 sub-title recommend">Recommended for you</h3>
                        <Recommended />
                    </>
                )
            }
        </Container>
    );
};

export default HomePage;