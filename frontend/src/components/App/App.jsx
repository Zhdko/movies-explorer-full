import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './App.css';
import NotFound from '../NotFound/NotFound';
import { useEffect, useState } from 'react';
import ProtectedRouteElement from '../ProtectedRoute/ProptectedRoute';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import api from '../../utils/Api';
import PopupInfo from '../PopupInfo/PopupInfo';
import movieApi from '../../utils/MoviesApi';
import { useResize } from '../../hooks/useResize';
import { MOVIE_LENGTH_MD, MOVIE_LENGTH_SM } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [infoMessage, setInfoMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isResultError, setIsResultError] = useState(false);
  const [moviesLength, setMoviesLength] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const windowSize = useResize();

  function getUserInfo() {
    auth
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => openPopup(err));
  }

  function handleRegister(email, password, name) {
    auth
      .register(email, password, name)
      .then((res) => {
        openPopup('Вы успешно зарегистрированы!', true);
        setTimeout(() => closePopup(), 1000);
        handleLogin(email, password);
      })
      .catch((err) => openPopup(err, false));
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        getUserInfo();
        navigate('/movies', { replace: true });
      })
      .catch((err) => openPopup(err));
  }

  function handleLogout() {
    auth
      .logout()
      .then(() => {
        setLoggedIn(false);
        navigate('/', { replace: true });
        localStorage.clear();
        setMovies([]);
      })
      .catch((err) => openPopup(err))
      .finally(() => {
        openPopup('Вы вышли из системы.', true);
        setTimeout(() => closePopup(), 1200);
      });
  }

  function handleEditProfile(userData) {
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => openPopup(err))
      .finally(() => {
        openPopup('Данные успешно изменены', true);
        setTimeout(() => closePopup(), 1000);
      });
  }

  function openPopup(message, isSuccessfully) {
    setIsOpen(true);
    setInfoMessage({
      isSuccessfully: isSuccessfully || false,
      text: message.message || message || 'Что-то пошло не так!',
    });
  }

  function closePopup() {
    setIsOpen(false);
    setTimeout(() => setInfoMessage(null), 400);
  }

  function filterMovies(filmName, isShortFilms) {
    const filteredMovies = JSON.parse(localStorage.getItem('allMovies')).filter((movie) =>
      movie.nameRU.toLowerCase().includes(filmName.toLowerCase())
    );
    const movies = isShortFilms ? filteredMovies.filter((movie) => movie.duration <= 40) : filteredMovies;
    setMovies(movies);
    localStorage.setItem('movieName', filmName);
    localStorage.setItem('movies', JSON.stringify(movies));
    localStorage.setItem('isShortFilms', JSON.stringify(isShortFilms));
  }

  function handleSearch(filmName, isShortFilms) {
    if (filmName === '' || filmName === undefined) {
      openPopup('Нужно ввести ключевое слово', false);
      setTimeout(() => closePopup(), 1000);
      return;
    }
    setIsLoading(true);

    if (!localStorage.getItem('allMovies')) {
      movieApi
        .getMovies()
        .then((res) => {
          localStorage.setItem('allMovies', JSON.stringify(res));
          filterMovies(filmName, isShortFilms);
        })
        .then((res) => console.log(res))
        .catch((err) => {
          openPopup(err);
          setIsResultError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      filterMovies(filmName, isShortFilms);
      setIsLoading(false);
    }
  }

  function isSaved(card) {
    return savedMovies.some((movie) => movie.movieId === card.id);
  }

  function addToFavorites(card) {
    api
      .addToFavorites(card)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => openPopup(err));
  }

  function removeFromFavorites(card) {
    const savedMovie = savedMovies.find(
      (movie) => movie.movieId === (card.movieId || card.id) && (movie.owner._id || movie.owner) === currentUser._id
    );
    api
      .removeCard(savedMovie._id)
      .then((res) => {
        setSavedMovies(savedMovies.filter((movie) => movie._id !== savedMovie._id));
      })
      .catch((err) => openPopup(err));
  }

  function tokenCheck() {
    if (localStorage.getItem('isAuth')) {
      auth
        .getUserInfo()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            if (pathname === '/signin' || pathname === '/signup') {
              navigate('/', { replace: true });
            }
          }
        })
        .catch((err) => {
          setIsPageLoading(true);
          openPopup(err);
        });
    } else {
      setIsPageLoading(true);
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([auth.getUserInfo(), api.getSavedMovies()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(moviesData);
          const movies = JSON.parse(localStorage.getItem('movies'));
          if (movies) {
            setMovies(movies);
          }
        })
        .catch((err) => openPopup(err))
        .finally(() => setIsPageLoading(true));
    }
  }, [loggedIn]);

  useEffect(() => {
    !windowSize.isScreenSm ? setMoviesLength(MOVIE_LENGTH_SM) : setMoviesLength(MOVIE_LENGTH_MD);
  }, [windowSize]);

  return (
    <div className='content'>
      {isPageLoading ? (
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path='/' element={<Main loggedIn={loggedIn} />} />
            <Route
              path='/movies'
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Movies}
                  handleSearch={handleSearch}
                  movies={movies}
                  isLoading={isLoading}
                  isResultError={isResultError}
                  defaultInputValue={localStorage.getItem('movieName') || ''}
                  handleLike={addToFavorites}
                  handleDelete={removeFromFavorites}
                  isSaved={isSaved}
                  moviesLength={moviesLength}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={SavedMovies}
                  isLoading={isLoading}
                  handleSearch={handleSearch}
                  movies={savedMovies}
                  handleDelete={removeFromFavorites}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Profile}
                  onLogout={handleLogout}
                  onEditProfile={handleEditProfile}
                />
              }
            />
            <Route path='/signin' element={<Login onLogin={handleLogin} />} />
            <Route path='/signup' element={<Register onRegister={handleRegister} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <PopupInfo message={infoMessage} isOpen={isOpen} onClose={closePopup} />
        </CurrentUserContext.Provider>
      ) : (
        <div className='content__preloader'>
          <Preloader />
        </div>
      )}
    </div>
  );
}

export default App;
