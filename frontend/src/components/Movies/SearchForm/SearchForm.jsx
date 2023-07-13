import { useEffect, useState } from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';

function SearchForm(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [movieName, setMovieName] = useState('');
  const location = useLocation();

  const isLocalShortFilms = JSON.parse(localStorage.getItem('isShortFilms'));

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSearch(movieName || '', isChecked);
  }

  function handleChange(e) {
    setMovieName(e.target.value);
  }

  function handleChangeCheckbox(e) {
    const isShortFilms = e.target.checked;
    setIsChecked(isShortFilms);
    props.handleSearch(movieName, isShortFilms);
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      setMovieName(props.defaultInputValue);
      setIsChecked(isLocalShortFilms || false);
    }
  }, []);

  return (
    <section className='movies__search-form'>
      <form name='search-form' className='search-form' onSubmit={handleSubmit}>
        <input
          id='search'
          type='text'
          name='search'
          className='search-form__input'
          placeholder='Фильм'
          required=''
          value={movieName}
          onChange={handleChange}
        />
        <button className='search-form__submit-btn' type='submit'>
          Поиск
        </button>
      </form>
      <FilterCheckbox checked={isChecked} onChange={handleChangeCheckbox} />
      <div className='search-form__line'></div>
    </section>
  );
}

export default SearchForm;
