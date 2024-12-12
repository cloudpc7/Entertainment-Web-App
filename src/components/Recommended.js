import MovieCard from "./MovieCard";
import { Container } from 'react-bootstrap';
import '../styles/recommend/recommend.scss';

const Recommended = ({movies}) => {
    const movieList = movies.filter((movie) => !movie.isTrending);
    
    return (
        <Container className="recommend-container">
            {
                movieList.map((movie) => {
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