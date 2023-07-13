import { useLocation } from 'react-router-dom';
import Message from '../Message/Message';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import { useEffect, useRef, useState } from 'react';

function MoviesCardList(props) {
  const location = useLocation();
  const [moviesToShow, setMoviesToShow] = useState(props.movies);
  const ref = useRef(props.moviesLength);
  let arrMovies = [];

  function loopWhitSlice(start, finish) {
    const slicedMovies = props.movies.slice(start, finish);
    arrMovies = arrMovies.concat(slicedMovies);
    setMoviesToShow(arrMovies);
  }

  function handleShowMore() {
    loopWhitSlice(0, ref.current + props.moviesLength);
    ref.current += props.moviesLength;
  }

  useEffect(() => {
    const slicedMovies = props.movies.slice(0, props.moviesLength);
    setMoviesToShow(slicedMovies);
    ref.current = props.moviesLength
  }, [props.movies, props.moviesLength]);

  function renderMessage() {
    if (location.pathname === '/movies') {
      if (localStorage.getItem('movies')) {
        return 'Ничего не найдено';
      }
      return 'Введите ключевое слово';
    }
    return 'Нет избранных фильмов';
  }
  if (props.isLoading) return <Preloader />;
  if (props.movies.length === 0) return <Message message={renderMessage()} />;
  if (props.isResultError) {
    return (
      <Message
        message={
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        }
      />
    );
  }

  return (
    <div>
      <ul className='cards list'>
        {moviesToShow.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              handleLike={props.handleLike}
              handleDelete={props.handleDelete}
              isSaved={props.isSaved}
            />
          );
        })}
      </ul>
      {props.movies.length > props.moviesLength && props.movies.length !== moviesToShow.length && (
        <button type='button' className='show-more-btn' onClick={handleShowMore}>
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
