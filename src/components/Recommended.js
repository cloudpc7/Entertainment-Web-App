import MovieCard from "./MovieCard";
import { Container } from 'react-bootstrap';
import '../styles/recommend/recommend.scss';

import { useContext } from 'react';
import MovieContext from '../MovieContext';

const Recommended = () => {
    const { recommend, handleBookmark} = useContext(MovieContext);
    return (
        <Container className="recommend-container">
            {
                recommend.map((movie) => {
                    const {
                        category, 
                        isBookmarked, 
                        rating,
                        thumbnail,
                        title,
                        year
                        } = movie;
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
        </Container>
    )
}

export default Recommended;