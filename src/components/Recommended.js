import MovieCard from "./MovieCard";
import { Container } from 'react-bootstrap';
import '../styles/recommend/recommend.scss';

const Recommended = ({recommended}) => {
    
    return (
        <Container className="recommend-container">
            {
                recommended.map((movie) => {
                    const {
                        category, 
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

export default Recommended;