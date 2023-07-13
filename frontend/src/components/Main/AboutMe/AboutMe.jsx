import './AboutMe.css';
import abouteMeImage from '../../../images/amoute-me-image.jpg';

function AboutMe(props) {
  return (
    <section className='section_size_m section' id='about-me'>
      <h2 className='section__title'>Студент</h2>
      <div className='section__line'></div>
      <div className='about-me__profile'>
        <div className='about-me__info'>
          <h2 className='about-me__title'>Александр</h2>
          <p className='about-me__paragraph about-me__paragraph_weight_bold'>Фронтенд-разработчик, 26лет</p>
          <p className='about-me__paragraph'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать
            музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После
            того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href='https://github.com/Zhdko' className='link about-me__git' target='_blank' rel='noreferrer'>
            Github
          </a>
        </div>
        <img src={abouteMeImage} alt='Фотография профиля' className='about-me__image' />
      </div>
    </section>
  );
}

export default AboutMe;
