import * as Yup from 'yup';
export const SCHEMA_REGISTER = Yup.object().shape({
  name: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(100, 'Username cannot exceed 100 characters'),
  email: Yup.string().email('Invalid email').required('Email is required').max(250, 'Email cannot exceed 250 characters'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

export const SCHEMA_LOGIN = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required').max(250, 'Email cannot exceed 250 characters'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});
