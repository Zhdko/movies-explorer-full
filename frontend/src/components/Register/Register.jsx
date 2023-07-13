import useValidation from '../../hooks/useValidation';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Register(props) {
  const { values, errors, handleChange, isValid, setIsValid } = useValidation({ name: '', email: '', password: '' });

  function handleSubmit(e) {
    setIsValid(false);
    e.preventDefault();
    props.onRegister(values.email, values.password, values.name);
  }
  return (
    <main>
      <AuthForm
        title={'Добро пожаловать!'}
        textBtn={'Зарегистрироваться'}
        link='/signin'
        textLink='Войти'
        subtitle='Уже зарегистрированы?'
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        <Input
          id='name'
          title='Имя'
          name='name'
          type='text'
          required=''
          minLength={2}
          maxLength={40}
          value={values.name || ''}
          onChange={handleChange}
          errors={errors.name || ''}
          placeholder='Введите имя'
        />
        <Input
          id='email'
          title='E-mail'
          name='email'
          type='email'
          required=''
          value={values.email || ''}
          onChange={handleChange}
          errors={errors.email || ''}
          placeholder='Введите e-mail'
        />
        <Input
          id='password'
          title='Пароль'
          name='password'
          type='password'
          required=''
          minLength={8}
          value={values.password || ''}
          onChange={handleChange}
          errors={errors.password || ''}
          placeholder='Введите пароль'
        />
      </AuthForm>
    </main>
  );
}

export default Register;
