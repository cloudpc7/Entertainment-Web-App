import "./styles/main.scss";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import Bookmarked from './pages/Bookmarked';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginPage />}/> */}
      <Route  path="/" element={<HomePage />} />
      {/* <Route  path="/movies" element={<Movies />} />
      <Route  path="/tvseries" element={<TVSeries />} />
      <Route  path="/bookmarked" element={<Bookmarked />} /> */}
    </Routes>

  );
}

export default App;
