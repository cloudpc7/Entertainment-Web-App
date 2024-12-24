import { Card, CardImg, CardTitle, CardBody, CardText, CardImgOverlay } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { useState, useEffect  } from 'react';
import movie from '../assets/icon-category-movie.svg';
import tv from '../assets/icon-category-tv.svg';
import bookmarkFull from '../assets/icon-bookmark-full.svg';
import bookmark from '../assets/icon-bookmark-empty.svg';
import '../styles/moviecard/moviecard.scss';
import { useContext } from 'react';

const MovieCard = ({category, isBookmarked, rating,title,year,small,medium,large, isTrending, handleBookmark}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    return (
       isTrending ?  (
        <>
            <Card
                className={
                        `movie-card ${ isTrending ? 
                        '' : 'movie-card-recommend'}`
                    }
            >
                <CardImgOverlay className="movie">
                    <div className="ring">
                        <Image 
                            onClick={() => handleBookmark(title)}
                                src={isBookmarked ? bookmarkFull : bookmark}
                                className="bookmark"
                        />
                    </div>
                    <CardBody className="movie-info">
                        <ul className="about-movie">
                            <li className="info">{year}</li>
                        
                            <li className="info">
                                {category}
                                <Image 
                                    className="info-image" 
                                    src={movie}

                                />
                            </li>
                            <span>{rating}</span>
                        </ul>
                        <CardText className="movie-title">{title}</CardText>
                    </CardBody>
                </CardImgOverlay>
                <CardImg 
                    src={
                        windowWidth <= 576 ?
                        small :
                        large
                    }
                    alt={title}
                    className="movie-image"
                />
            </Card>
        </>
       ) : (
        <>
            <Card className="movie-card-recommend">
                <CardImgOverlay className="movie">
                    <div className="ring">
                    <Image
                        onClick={() => handleBookmark(title)}
                        src={isBookmarked ? bookmarkFull : bookmark}
                        className="bookmark"
                    />  
                    </div>
                </CardImgOverlay>
                    <CardImg 
                        src={
                            windowWidth <= 576 ?
                                small :
                            windowWidth <= 768 ?
                                medium:
                                large
                        }
                        alt={title}
                        className="movie-image"
                    />
                    <CardBody className="movie-info">
                        <ul className="about-movie">
                            <li className="info">{year}</li>
                            <li className="info">
                                {category}
                                <Image 
                                    className="info-image" 
                                    src={
                                        category === "Movie" ?
                                        movie : tv
                                    }
                                />
                            </li>
                            <span className="rating">{rating}</span>
                        </ul>
                            <CardText className="movie-title">{title}</CardText>
                    </CardBody>
            </Card>
        </>
       )
    )
}

export default MovieCard;