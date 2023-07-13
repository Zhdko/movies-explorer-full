import './Header.css';
import Navigation from './Navigation/Navigation';
import AuthNavigation from './AuthNavigation/AuthNavigation';
import Logo from '../Logo/Logo';
import { useState } from 'react';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleMenuBtnClick() {
    setIsOpen(!isOpen);
  }
  return (
    <header className='header'>
      <Logo />
      {!props.loggedIn ? <Navigation /> : <AuthNavigation handleMenuBtnClick={handleMenuBtnClick} isOpen={isOpen} />}
    </header>
  );
}

export default Header;
