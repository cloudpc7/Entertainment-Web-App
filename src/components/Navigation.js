import { useState } from 'react';
import {  Nav, Navbar,Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import movieIcon from '../assets/logo.svg';
import homeIcon from '../assets/icon-nav-home.svg';
import homeFull from '../assets/icon-nav-home -full.svg';
import movies from '../assets/icon-nav-movies.svg';
import moviesFull from '../assets/icon-nav-movies-full.svg';
import tvIconFull from '../assets/icon-nav-tv-series -full.svg';
import tvIcon from '../assets/icon-nav-tv-series.svg';
import bookmark from '../assets/icon-nav-bookmark.svg';
import bookmarkFull from '../assets/icon-bookmark-full.svg';
import profileIcon from '../assets/image-avatar.png';

import '../styles/navigation/nav.scss';

const Navigation =  () => {

    const [hoverHome, setHoverHome] = useState(false);
    const [hoverMovies, setHoverMovies] = useState(false);
    const [hoverTv, setHoverTv] = useState(false);
    const [hoverBookmark, setHoverBookMark] = useState(false);

    const [active, setActive] = useState(null);

    const handleClick = (icon) => {
        setActive(active === icon ? null : icon);
    }

    return (
        <Navbar className="nav-container">
            <Navbar.Brand className="brand"><Image className="icon" src={movieIcon}/></Navbar.Brand>
            <Nav className="nav-icons">
                <Nav.Link 
                    to="/home"
                >
                    <Image 
                        className="icon" 
                        onMouseEnter={() => setHoverHome(true)}
                        onMouseLeave={() => setHoverHome(false)}
                        // onClick={() => handleClick('home')}
                        src={homeIcon}
                        style={{fill: "red"}}
                    />

                </Nav.Link>
                <Nav.Link 
                    to="/movies"
                >
                    <Image 
                        className="icon" 
                        onMouseEnter={() => setHoverMovies(true)}
                        onMouseLeave={() => setHoverMovies(false)}
                        // onClick={() => handleClick('movies')}
                        src={movies}
                    />
                </Nav.Link>
                <Nav.Link 
                    to="/tvseries"
                >
                    <Image 
                        className="icon"  
                        onMouseEnter={() => setHoverTv(true)}
                        onMouseLeave={() => setHoverTv(false)}
                        onClick={() => handleClick('tv')}
                        src={
                            active === 'tv' ? tvIconFull : 
                            (hoverTv ? tvIconFull : tvIcon)
                        }
                    />

                </Nav.Link>
                <Nav.Link 
                    to="/bookmarked"
                >
                    <Image 
                    className="icon" 
                    onMouseEnter={() => setHoverBookMark(true)}
                    onMouseLeave={() => setHoverBookMark(false)}
                    onClick={() => handleClick('book')}
                        src={
                            active === 'book' ? bookmarkFull : 
                            (hoverBookmark ? bookmarkFull : bookmark)
                        }
                    />

                </Nav.Link>
            </Nav>
            <Image className="avatar" src={profileIcon} alt="profile image"/>
        </Navbar>
    )
}

export default Navigation;