import { useState } from 'react';
import {  Nav, Navbar,Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
                    href="/"
                >
                    <Image 
                        className="icon" 
                        onMouseEnter={() => setHoverHome(true)}
                        onMouseLeave={() => setHoverHome(false)}
                        onClick={() => handleClick('home')}
                        src={
                            active === 'home' ? homeFull : 
                            (hoverHome ? homeFull : homeIcon)
                        }
                        style={{fill: "red"}}
                    />

                </Nav.Link>
                <Nav.Link 
                    href="/movies"
                >
                    <Image 
                        className="icon" 
                        onMouseEnter={() => setHoverMovies(true)}
                        onMouseLeave={() => setHoverMovies(false)}
                        onClick={() => handleClick('movies')}
                        src={
                            active === 'movies' ? moviesFull : 
                            (hoverMovies ? moviesFull : movies)
                        }
                    />
                </Nav.Link>
                <Nav.Link 
                    href="/tvseries"
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
                    href="/bookmarked"
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