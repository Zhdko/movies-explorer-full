import './Profile.css';
import Header from '../Header/Header';
import useValidation from '../../hooks/useValidation';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../Contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const { name, email } = currentUser;
  const { setIsValid, values, errors, handleChange, isValid } = useValidation({
    name: name,
    email: email,
  });
  const [isSame, setIsSame] = useState(true);

  useEffect(() => {
    setIsValid(true);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditProfile(values);
  }

  useEffect(() => {
    if (name !== values.name || email !== values.email) {
      setIsSame(false);
    } else {
      setIsSame(true);
    }
  }, [values, currentUser]);

  return (
    <>
      <Header loggedIn={true} />
      <main className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'>Привет {currentUser.name}!</h2>
          <form className='form profile-form' onSubmit={handleSubmit}>
            <div className='profile-form__container'>
              <label htmlFor='name' className='profile-form__label'>
                Имя
              </label>
              <input
                id='name'
                type='text'
                name='name'
                className='profile-form__input'
                required=''
                minLength={2}
                maxLength={40}
                value={values.name}
                onChange={handleChange}
                errors={errors.message}
                placeholder='Введите имя'
              />
            </div>
            <span className='error error_type_profile'>{errors.name || ''}</span>
            <div className='profile__line'></div>
            <div className='profile-form__container'>
              <label htmlFor='email' className='profile-form__label'>
                E-mail
              </label>
              <input
                id='email'
                type='email'
                name='email'
                className='profile-form__input'
                required=''
                value={values.email}
                onChange={handleChange}
                placeholder='Введите e-mail'
              />
            </div>
            <span className='error error_type_profile'>{errors.email || ''}</span>
            <button
              className={`profile__btn profile__btn_type_submit ${isSame || !isValid ? 'profile__btn_disabled' : ''}`}
              disabled={isSame || !isValid}
              type='submit'
              aria-label='Редактировать профиль'
            >
              Редактировать
            </button>
          </form>
          <button
            className='profile__btn profile__btn_type_exit'
            type='button'
            aria-label='Выйти из аккаунта'
            onClick={props.onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </>
  );
}

export default Profile;
