import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { BEGINNING_OF_URL, MOVIE_DURATION_HOUR } from '../../utils/constants';

function MoviesCard(props) {
  const movie = props.movie;
  const location = useLocation();

  const name = movie.nameRU;
  const cover = !movie.image.url ? movie.image : BEGINNING_OF_URL + movie.image.url;

  const duration = () => {
    const minutes = (movie.duration % MOVIE_DURATION_HOUR) + 'м';
    const hours = Math.floor(movie.duration / MOVIE_DURATION_HOUR) + 'ч';
    if (movie.duration > MOVIE_DURATION_HOUR) {
      return hours + ' ' + minutes;
    } else if (movie.duration === MOVIE_DURATION_HOUR) {
      return hours;
    } else {
      return minutes;
    }
  };

  function handleLike() {
    props.isSaved(movie) ? props.handleDelete(movie) : props.handleLike(movie);
  }

  function handleDelete() {
    props.handleDelete(movie);
  }
  return (
    <li className='card'>
      <div className='card__info'>
        <div className='card__discription'>
          <h2 className='card__title'>{name}</h2>
          <p className='card__duration'>{duration()}</p>
        </div>
        {location.pathname === '/saved-movies' ? (
          <button type='button' onClick={handleDelete} className='card__icon card__delete' />
        ) : (
          <button
            type='button'
            onClick={handleLike}
            className={`card__icon card__like ${props.isSaved(movie) && 'card__like_active'}`}
          />
        )}
      </div>
      <a className='link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img src={cover} alt={name} className='card__img' />
      </a>
    </li>
  );
}

export default MoviesCard;
