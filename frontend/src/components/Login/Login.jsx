import useValidation from '../../hooks/useValidation';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Login(props) {
  const { values, errors, handleChange, isValid, setIsValid } = useValidation({ email: '', password: '' });

  function handleSubmit(e) {
    setIsValid(false);
    e.preventDefault();
    props.onLogin(values.email, values.password);
  }
  return (
    <main>
      <AuthForm
        title={'Рады видеть!'}
        textBtn={'Войти'}
        link='/signup'
        textLink='Регистрация'
        subtitle='Еще не зарегистрированы?'
        onSubmit={handleSubmit}
        isValid={isValid}
      >
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

export default Login;
