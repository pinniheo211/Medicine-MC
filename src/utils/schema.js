import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const SCHEMA_REGISTER = Yup.object().shape({
  name: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(100, 'Username cannot exceed 100 characters'),
  email: Yup.string().email('Invalid email').required('Email is required').max(250, 'Email cannot exceed 250 characters'),
  phone: Yup.string().required('required').matches(phoneRegExp, 'Phone number is not valid').min(10, 'too short').max(10, 'too long'),

  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

export const SCHEMA_LOGIN = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required').max(250, 'Email cannot exceed 250 characters'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});
