import { useState, useEffect } from 'react';
import movieApi from './utilities/movieApi';
import { search } from './utilities/search';
import "./styles/main.scss";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import Bookmarked from './pages/Bookmarked';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import validator from 'validator';

function App() {

  const [searchResults, setSearchResults ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errMsg, setErrMsg] = useState({});

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true)
          const moviesData = await movieApi();
          setMovies(moviesData);
          setIsLoading(false);
      } catch (error) {
          console.error(error);
          setIsLoading(false);
      }
    }
    getMovies();
  },[]);


  useEffect(() => {
    setIsLoading(true);
    const results = search(searchTerm,movies);
    setSearchResults(results);
    setIsLoading(false);
  }, [searchTerm, movies]);

  const handleBookmark = (movieTitle) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => 
        movie.title === movieTitle 
          ? { ...movie, isBookmarked: !movie.isBookmarked } 
          : movie 
      )
    );
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const { email, password } = formData;

    // const hashedPassword = await bcrypt.hash(password, 10); 

    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password: hashedPassword }), 
    //   });

    //   if (!response.ok) {
    //     throw new Error('Login failed');
    //   }

    //   const data = await response.json();

    //   if (data.success) {
    //     setIsLoggedIn(true);
    //     setCookies('token', data.token, { path: '/', secure: true, httpOnly: true }); 
    //     navigate('/'); 
    //   } else {
    //     setErrMsg({ password: 'Invalid email or password' });
    //   }
    // } catch (error) {
    //   console.error('Login error:', error);
    //   setErrMsg({ password: 'Login failed. Please try again.' });
    // }
    setIsLoggedIn(true);
    navigate('home');
    setTouched({}); 
  };

  const handleToggleForm = () => {
    setSignUp(!signUp);
    setLogin(!login);
    setFormData({ email: '', password: '' });
    setSignUp({signUpEmail: '', signUpPassword: '', signUpConfirmPassword: ''})
    setErrMsg({});
    setTouched({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    if (!value) {
      setErrMsg({
        ...errMsg,
        [name]: "Can't be empty",
      });
    } else if (name === "email") {
      if (!validator.isEmail(value)) {
        setErrMsg({
          ...errMsg,
          [name]: "Invalid email format",
        });
      } else {
        setErrMsg({
          ...errMsg,
          [name]: null,
        });
      }
    } else if (name === "password") {
      if (!validator.isStrongPassword(value)) {
        setErrMsg({
          ...errMsg,
          [name]: (
            <ul>
              <li>At least 8 characters long</li>
              <li>At least one lowercase character</li>
              <li>At least one uppercase character</li>
              <li>At least one number</li>
              <li>At least one symbol</li>
            </ul>
          ),
        });
      } else {
        setErrMsg({
          ...errMsg,
          [name]: null,
        });
      }
    }
  };

  return (
    <Container className="app-container">
      <Routes>
        <Route 
          path="/login"
          element={
            <LoginPage 
              IsLoggedIn={isLoggedIn}
              login={login}
              signUp={signUp}
              errMsg
              formData={formData}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleToggleForm={handleToggleForm}
            />
          }
        />
        {
          isLoggedIn ? (
            <>
              <Route 
                path="/home"
                element={
                  <HomePage 
                    movies={movies} 
                    handleBookmark={handleBookmark} 
                    isLoading={isLoading}
                    searchTerm={searchTerm}
                    searchResults={searchResults}
                    handleSearch={handleSearch}
                  />
                }
              />
            </>
          ) : (
            <Route 
              path="/login"
              element={
                <LoginPage 
                  IsLoggedIn={isLoggedIn}
                  login={login}
                  signUp={signUp}
                  errMsg
                  formData={formData}
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleToggleForm={handleToggleForm}
                />
              }
            />
          )
        }
      </Routes>
    </Container>
  );
}

export default App;
