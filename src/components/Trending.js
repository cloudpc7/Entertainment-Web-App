import MovieCard from './MovieCard';
import { Container } from 'react-bootstrap';
import '../styles/trending/trending.scss';
import { useContext } from 'react';
import MovieContext from '../MovieContext';

const Trending = () => {
    const {isTrending, handleBookmark} = useContext(MovieContext);
    return ( 
        <Container className="trending-container">
            {
                isTrending.map((trending) => {
                    const { category, isBookmarked, rating, thumbnail,title,year, isTrending} = trending;
                    const { small, large } = thumbnail.trending;
                    return (
                        <MovieCard 
                            key={title}
                            category={category}
                            isBookmarked={isBookmarked}
                            isTrending={isTrending}
                            rating={rating}
                            small ={small}
                            large={large}
                            title={title}
                            year={year}
                            handleBookmark={handleBookmark}
                        />
                    )
                })
            }
        </Container>
        
    )
}

export default Trending;