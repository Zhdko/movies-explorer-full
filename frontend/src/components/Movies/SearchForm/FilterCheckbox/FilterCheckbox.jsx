import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return (
    <div className='movies-filter'>
      <input
        type='checkbox'
        name='movies-filter'
        checked={props.checked}
        onChange={props.onChange}
        id='movies-filter'
        className='filter-checkbox'
      />
      <label htmlFor='movies-filter' className='toggle'></label>
      <p className='movies-filter__text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
