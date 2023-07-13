import './NavTab.css';

function NavTab(props) {
  return (
    <nav>
      <ul className='nav-tab list'>
        <li className='nav-tab__item'>
          <a href='#about-project' className='link nav-tab__link'>
            О проекте
          </a>
        </li>
        <li className='nav-tab__item'>
          <a href='#techs' className='link nav-tab__link'>
            Технологии
          </a>
        </li>
        <li className='nav-tab__item'>
          <a href='#about-me' className='link nav-tab__link'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
