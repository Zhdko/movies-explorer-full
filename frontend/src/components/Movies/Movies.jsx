import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies(props) {
  return (
    <div>
      <Header loggedIn={props.loggedIn} />
      <main className='movies'>
        <SearchForm handleSearch={props.handleSearch} defaultInputValue={props.defaultInputValue} />
        <MoviesCardList
          movies={props.movies}
          isLoading={props.isLoading}
          isResultError={props.isResultError}
          handleLike={props.handleLike}
          handleDelete={props.handleDelete}
          isSaved={props.isSaved}
          moviesLength={props.moviesLength}
          handleShowMore={props.handleShowMore}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
