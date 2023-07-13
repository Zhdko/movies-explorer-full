import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { useEffect, useState } from 'react';

function SavedMovies(props) {
  const [movies, setMovies] = useState(props.movies);

  function handleSearch(filmName, isShortFilms) {
    if (filmName === '') {
      setMovies(props.movies);
    }

    const filteredMovies = props.movies.filter((movie) => movie.nameRU.toLowerCase().includes(filmName.toLowerCase()));
    if (isShortFilms) {
      setMovies(filteredMovies.filter((movie) => movie.duration <= 40));
    } else {
      setMovies(filteredMovies);
    }
  }

  useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);

  return (
    <div>
      <Header loggedIn={props.loggedIn} />
      <main className='movies'>
        <SearchForm handleSearch={handleSearch} defaultInputValue='' />
        <MoviesCardList movies={movies} handleDelete={props.handleDelete} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
