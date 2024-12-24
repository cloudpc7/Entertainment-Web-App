import { useState, useEffect, useRef } from 'react';
import MovieContext from '../MovieContext';
import { search } from '../utilities/search';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../utilities/movieApi';

const MovieProvider = ({ children }) => {
   
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.movies.isLoading);
    const moviesArray = useSelector(state => state.movies.moviesArray);
    const errMsg = useSelector(state => state.movies.errMsg);
    const [isTrending, setIsTrending] = useState([]);
    const [recommend, setRecommend] = useState([]);
    const [bookmarked, setBookmarked] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(() => {
        if(movies.length > 0) {
            setIsTrending((prev) => movies.filter((movie) => movie.isTrending));
        }
    }, [movies]);

    useEffect(() => {
        if(movies.length > 0) {
            setRecommend((prev) => movies.filter((movie) => movie.isTrending === false));
        }
    }, [movies]);

    useEffect(() => {
        if(movies.length > 0) {
            setBookmarked((prev) => movies.filter((movie) => movie.isBookmarked));
        }
    }, [movies]);

    useEffect(() => {
        setMovies(moviesArray);
    },[moviesArray])

    //search states and loading states
    const [searchResults, setSearchResults ] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // search input and  search error states
    const [input, setInput] = useState('');
    const [searchMsg, setSearchMsg] = useState('');
    const timeoutRef = useRef(null);

    //movie db state
    // window sizing state 
    const [windowWidth, setWindowWidth ] = useState(window.innerWidth);

    //search functions
    const handleSearch = (term) => {
        setSearchTerm(term);
      };

    useEffect(() => {
        setLoading(true);
        const results = search(searchTerm,movies);
        setSearchResults(results);
        setLoading(false);
    }, [searchTerm, movies]);

   
    // useEffect(() => {
    //     const handleResize = () => setWindowWidth(window.innerWidth);
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, [windowWidth]);

    //bookmarking function

    const handleBookmark = (movieTitle) => {
        setMovies((prevMovies) => prevMovies.map((movie) =>
            movie.title === movieTitle ?
            {...movie, isBookmarked: !movie.isBookmarked} : movie,
        ))
    }

    // search input and error message functions

    const handleSearchInput = (event) => {
        let value = event.target.value;
        const regExp = /^[a-zA-Z0-9\s]+$/;

        if(!regExp.test(value)) {
            setInput('');
            setSearchMsg(`No results.`)
        } else {
            setInput(value);
        }
    };

    const clearInput = () => {
        setTimeout(() => {
            setInput('');
            setSearchMsg('');
        }, 1000);
    }

    useEffect(() => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if(input.length > 0) {
            timeoutRef.current = setTimeout(() => {
                handleSearch(input);
            }, 1000);
        } else {
        }

        if(searchMsg) {
            clearInput();
        } else {
            handleSearch(input);
        }

        return () => clearTimeout(timeoutRef.current);
        
    },[input,searchMsg]);

    const contextValue = {
        searchResults,
        isLoading,
        loading,
        searchTerm,
        moviesArray,
        windowWidth,
        input,
        searchMsg,
        isTrending,
        recommend,
        bookmarked,
        handleSearchInput,
        handleSearch,
        handleBookmark,
    };


    return (
        <MovieContext.Provider value={contextValue}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieProvider;