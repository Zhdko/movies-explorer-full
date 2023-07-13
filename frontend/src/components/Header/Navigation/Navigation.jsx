import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
  return (
    <div className='navigation'>
      <Link to='/signup' className='link navigation__link'>
        Регистрация
      </Link>
      <Link to='/signin' className='link navigation__link navigation_link_type_btn'>
        Войти
      </Link>
    </div>
  );
}

export default Navigation;
