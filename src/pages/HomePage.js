import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import Navigation from '../components/Navigation';
import SearchBar from '../components/Searchbar';
import Trending from '../components/Trending';
// import Recommended from '../components/Recommended';
import '../styles/home/home.scss';
import movieApi from '../utilities/movieApi';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const moviesData = await movieApi();
                setMovies(moviesData);
            } catch (error) {
                console.error(error);
            }
        }

        getMovies();
    },[])

    const isTrending = movies.filter((movie) => movie.isTrending);
    const recommended = movies.filter((movie) => !movie.isTrending);
    
    return (
        <Container className="home-container">
            <Row className="nav-col">
                <Navigation />
            </Row>
            <Row className="home">
                <Col className="search-col">
                    <SearchBar movies={movies} />
                </Col>
                <Col className="trending-col">
                    <h3 className="h3 sub-title">Trending</h3>
                    <Trending 
                        isTrending={isTrending}
                    />
                </Col>
                <Col className="recommend-col">
                    <h3 className="h3 sub-title">Recommended</h3>
                    {/* <Recommended 
                        movies={movies}
                    /> */}
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;