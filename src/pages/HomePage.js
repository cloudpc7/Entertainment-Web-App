import { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap'; 
import Trending from '../components/Trending';
import Recommended from '../components/Recommended';
import SearchBar from '../components/Searchbar';
import '../styles/home/home.scss';
import MovieCard from '../components/MovieCard';

const HomePage = ({ 
    movies, 
    searchTerm, 
    searchResults, 
    handleBookmark, 
    isLoading,
    handleSearch
    }) => {
    
    const resultText = searchResults.length === 1 ? 'result' : 'results';

    const isTrending = movies.filter((movie) => movie.isTrending);
    const recommended = movies.filter((movie) => !movie.isTrending);

    return (
        <Container className="home-container">
            <Row className="home">
                <Col className="search-col">
                    <SearchBar 
                        movies={movies} 
                        onSearch={handleSearch}
                        searchTerm={searchTerm}
                        searchResults={searchResults}
                    />
                </Col>
                <Col className="trending-col">
                    {  
                        isLoading && searchTerm && searchResults.length > 0 ?  (
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
                            </>
                        ) : searchTerm  && searchResults.length > 0 ? (
                            <Spinner animation="border" size="lg"/>
                        )  : (
                            <>
                                <h3 className="h3 sub-title">Trending</h3>
                                    <Trending 
                                        isTrending={isTrending}
                                        searchResults={searchResults}
                                        searchTerm={searchTerm}
                                        handleBookmark={handleBookmark}
                                    />
                            </>
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