import { NavLink } from 'react-router-dom';
import './AuthNavigation.css';

import userIcon from '../../../images/user-icon.svg';
import BurgerMenu from '../../BurgerMenu/BurgerMenu';

function AuthNavigation(props) {
  return (
    <>
      <BurgerMenu isOpen={props.isOpen} handleMenuBtnClick={props.handleMenuBtnClick} />
      <div className={`menu ${props.isOpen && 'menu_opened'}`}>
        <nav>
          <ul className={`auth-navigation list ${props.isOpen && 'auth-navigation_opened'}`}>
            <li className='auth-navigation__item auth-navigation__item_type_main'>
              <NavLink className='link auth-navigation__link' to='/'>
                Главная
              </NavLink>
            </li>
            <li className='auth-navigation__item'>
              <NavLink className='link auth-navigation__link' to='/movies'>
                Фильмы
              </NavLink>
            </li>
            <li className='auth-navigation__item'>
              <NavLink className='link auth-navigation__link' to='/saved-movies'>
                Сохраненные фильмы
              </NavLink>
            </li>
            <li className='auth-navigation__item auth-navigation__item_type_profile'>
              <NavLink className='link' to='/profile'>
                Аккаунт
              </NavLink>
              <img src={userIcon} alt='Перейти в профиль' className='user-icon' />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default AuthNavigation;
