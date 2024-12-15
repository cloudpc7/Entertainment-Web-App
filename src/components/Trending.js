import MovieCard from './MovieCard';
import { Container } from 'react-bootstrap';
import '../styles/trending/trending.scss';

const Trending = ({ isTrending, handleBookmark  }) => {
    return (
        
        <Container className="trending-container">
            {
                isTrending.map((movie) => {
                    const { 
                        category, 
                        isTrending,
                        isBookmarked,
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
                                    handleBookmark={handleBookmark}
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