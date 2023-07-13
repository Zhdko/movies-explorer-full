import './AboutProject.css';

function AboutProject(props) {
  return (
    <section className='section about-project' id='about-project'>
      <h2 className='section__title'>О проекте</h2>
      <div className='section__line'></div>
      <div className='description'>
        <div className='description__column'>
          <h2 className='description__title'>Дипломный проект включал 5 этапов</h2>
          <p className='description__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='description__column'>
          <h2 className='description__title'>На выполнение диплома ушло 5 недель</h2>
          <p className='description__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='time-line'>
        <div className='time-line_color_green'>
          <h2 className='time-line__title time-line__title_color_green'>1 неделя</h2>
          <p className='time-line__subtitle'>Back-end</p>
        </div>
        <div className='time-line_color_grey'>
          <h2 className='time-line__title time-line__title_color_grey'>4 недели</h2>
          <p className='time-line__subtitle'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
