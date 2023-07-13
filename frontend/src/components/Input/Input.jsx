import './Input.css';

function Input(props) {
  return (
    <div className='input'>
      <label htmlFor={props.name} className='input__title'>
        {props.title}
      </label>
      <input
        id={props.name}
        type={props.type}
        name={props.name}
        className={`input__field ${props.errors !== '' && 'input__error'}`}
        placeholder={props.placeholder}
        {...props}
      />
      <span className={`error error-${props.name}`}>{props.errors}</span>
    </div>
  );
}

export default Input;
