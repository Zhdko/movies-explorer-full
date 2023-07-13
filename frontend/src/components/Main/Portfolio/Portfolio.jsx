import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='list portfolio__list'>
        <li className='portfolio__item'>
          <a
            href='https://github.com/Zhdko/how-to-learn'
            className='portfolio__link link'
            target='_blank'
            rel='noreferrer'
          >
            <h2 className='portfolio__subtitle'>Статичный сайт</h2>
            <p className='portfolio__icon'>↗</p>
          </a>
          <div className='section__line section__line_color_grey'></div>
        </li>
        <li className='portfolio__item'>
          <a href='https://zhdko.github.io/Web_3.0/' className='portfolio__link link' target='_blank' rel='noreferrer'>
            <h2 className='portfolio__subtitle'>Адаптивный сайт</h2>
            <p className='portfolio__icon'>↗</p>
          </a>
          <div className='portfolio__line'></div>
        </li>
        <li className='portfolio__item'>
          <a
            href='https://github.com/Zhdko/react-mesto-api-full-gha'
            className='portfolio__link link'
            target='_blank'
            rel='noreferrer'
          >
            <h2 className='portfolio__subtitle'>Одностраничное приложение</h2>
            <p className='portfolio__icon'>↗</p>
          </a>
          <div className='section__line section__line_color_grey'></div>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
