import { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Trending from '../components/Trending';
import Recommended from '../components/Recommended';
import SearchBar from '../components/Searchbar';
import '../styles/home/home.scss';
import MovieCard from '../components/MovieCard';
import Searchbar from '../components/Searchbar';

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
            <Navigation />
            <Searchbar 
                movies={movies} 
                onSearch={handleSearch}
                searchTerm={searchTerm}
                searchResults={searchResults}     
            />
            {
                isLoading && searchTerm ? (
                    <Spinner className="spinner" animation="border" size="sm"/>
                ) : searchTerm && searchResults.length > 0 ? (
                    <>
                        <h3 className="h3 sub-title">{
                            `Found ${searchResults.length} ${resultText} for ${searchTerm}`
                        }
                        </h3>
                        <div>
                            {
                                searchResults.map((movie) =>  {
                                    const {
                                        category,
                                        isBookmarked,
                                        rating,
                                        thumbnail,
                                        title,
                                        year
                                    } = movies

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
                ) : (
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
        </Container>
    );
};

export default HomePage;