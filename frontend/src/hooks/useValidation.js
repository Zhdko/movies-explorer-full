import { useEffect, useState } from 'react';

function useValidation(keys) {
  const [values, setValues] = useState(keys);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const target = e.target;
    const { name, value } = target;

    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: target.validationMessage }));
    setIsValid(target.closest('form').checkValidity());
  }

  function defaultValues(values = {}, errors = {}) {
    setValues(values);
    setErrors(errors);
  }

  useEffect(() => {
    const isEmpty = Object.values(values).some((value) => value === '');
    if (isEmpty) {
      setIsValid(false);
    }
  }, [values]);

  return { values, errors, handleChange, defaultValues, isValid, setValues, setIsValid };
}

export default useValidation;
