import './Techs.css';

function Techs(props) {
  return (
    <section className='techs' id='techs'>
      <div className='section'>
        <h2 className='section__title'>Технологии</h2>
        <div className='section__line'></div>
        <h2 className='techs__title'>7 технологий</h2>
        <p className='techs__paragraph'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='tech-stack list'>
          <h3 className='tech-stack__item'>HTML</h3>
          <h3 className='tech-stack__item'>CSS</h3>
          <h3 className='tech-stack__item'>JS</h3>
          <h3 className='tech-stack__item'>React</h3>
          <h3 className='tech-stack__item'>Git</h3>
          <h3 className='tech-stack__item'>Express.js</h3>
          <h3 className='tech-stack__item'>MongoDB</h3>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
