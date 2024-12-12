import MovieCard from './MovieCard';
import { Container } from 'react-bootstrap';
import '../styles/trending/trending.scss';

const Trending = ({movies}) => {
    const isTrending = movies.filter((movie) => movie.isTrending);

    return (
        <Container className="trending-container">
            {
                isTrending.map((movie) => {
                    const { 
                        category, 
                        isBookmarked, 
                        isTrending,
                        rating, 
                        thumbnail, 
                        title, 
                        year 
                    } = movie;

                    return (
                                <MovieCard 
                                    key={title}
                                    category={category}
                                    isBookmarked={isBookmarked}
                                    isTrending={isTrending}
                                    rating={rating}
                                    thumbnail={thumbnail}
                                    title={title}
                                    year={year}
                                />
                    )
                })
            }
        </Container>
        
    )
}

export default Trending;