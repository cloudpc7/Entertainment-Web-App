import { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import Navigation from '../components/Navigation';
import Trending from '../components/Trending';
import Recommended from '../components/Recommended';
import SearchBar from '../components/Searchbar';
import '../styles/home/home.scss';

import db from '../data.json';

const HomePage = () => {

    const [movies, setMovies ] = useState(db);


    return (
        <Container  className="home-container">
            <Row className="home">
                <Col className="nav-col">
                    <Navigation />
                </Col>
                <Col className="search-col">
                    <SearchBar 
                        movies={movies}
                    />
                </Col>
                <Col className="trending-col">
                    <h3 className="h3 sub-title">Trending</h3>
                    <Trending 
                        movies={movies}
                    />
                </Col>
                <Col className="recommend-col">
                    <h3 className="h3 sub-title">Recommended</h3>
                    <Recommended 
                        movies={movies}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;